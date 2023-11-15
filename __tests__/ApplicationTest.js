import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { EOL as LINE_SEPARATOR } from 'os';
import EventAlgorithm from '../src/EventAlgorithm.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();

    return Promise.resolve(input);
  });
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();

  return logSpy;
};

const getOutput = (logSpy) => {
  return [...logSpy.mock.calls].join(LINE_SEPARATOR);
};

const expectLogContains = (received, expectedLogs) => {
  expectedLogs.forEach((log) => {
    expect(received).toContain(log);
  });
};

describe('기능 테스트', () => {
  test('모든 타이틀 출력', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['3', '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1']);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = [
      '<주문 메뉴>',
      '<할인 전 총주문 금액>',
      '<증정 메뉴>',
      '<혜택 내역>',
      '<총혜택 금액>',
      '<할인 후 예상 결제 금액>',
      '<12월 이벤트 배지>',
    ];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('혜택 내역 타이틀과 없음 출력', async () => {
    // given
    const logSpy = getLogSpy();
    mockQuestions(['26', '타파스-1,제로콜라-1']);

    // when
    const app = new App();
    await app.run();

    // then
    const expected = ['<혜택 내역>' + LINE_SEPARATOR + '없음'];

    expectLogContains(getOutput(logSpy), expected);
  });

  test('determiningDate() 테스트: ', async () => {
    //given
    const dates = Array.from({ length: 31 }, (_, i) => `${i + 1}`);
    const eventAlgorithm = new EventAlgorithm();

    const CHRISTMAS_EVENT_DAY = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
    ];
    const WEEKEND = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];
    const WEEKDAY = [
      3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28,
      31,
    ];
    const SPECIAL_EVENT_DAY = [3, 10, 17, 24, 25, 31];

    //when

    for (const date of dates) {
      eventAlgorithm.determiningDate(date);
    }

    //then
    dates.forEach((date) => {
      if (CHRISTMAS_EVENT_DAY.includes(Number(date))) {
        expect(eventAlgorithm.IS_CHRISTMAS_EVENT_DAY).toBe(true);
      }
      if (WEEKEND.includes(Number(date))) {
        expect(eventAlgorithm.IS_WEEKEND).toBe(true);
      }
      if (WEEKDAY.includes(Number(date))) {
        expect(eventAlgorithm.IS_WEEKDAY).toBe(true);
      }
      if (SPECIAL_EVENT_DAY.includes(Number(date))) {
        expect(eventAlgorithm.IS_SPECIAL_EVENT).toBe(true);
      }
    });
  });

  test('userOrder() return 테스트', () => {
    const eventAlgorithm = new EventAlgorithm();
    const input = '티본스테이크-1,바비큐립-2,초코케이크-1';
    const result = eventAlgorithm.userOrder(input);

    expect(result).toEqual({
      menu: { 티본스테이크: 1, 바비큐립: 2, 초코케이크: 1 },
      menuName: ['티본스테이크', '바비큐립', '초코케이크'],
      menuQuantity: [1, 2, 1],
      menuNameList: ['티본스테이크', '바비큐립', '초코케이크'],
    });
  });
});

describe('주요 로직 테스트', () => {
  let eventAlgorithm;

  beforeEach(() => {
    eventAlgorithm = new EventAlgorithm();
  });

  test('findOrderInMenu(): 모든 주문 항목이 메뉴에 있는 경우', () => {
    const input = ['티본스테이크', '바비큐립', '초코케이크'];
    expect(eventAlgorithm.findOrderInMenu(input)).toBe(true);
  });

  test('findOrderInMenu(): 주문 항목이 메뉴에 없는 경우', () => {
    const input = ['티본스테이크', '바비큐립', '김치'];
    expect(eventAlgorithm.findOrderInMenu(input)).toBe(false);
  });

  test('orderBeverageOnly(): 주문이 음료만 포함하는 경우', () => {
    const input = ['제로콜라', '레드와인'];
    expect(eventAlgorithm.orderBeverageOnly(input)).toBe(true);
  });

  test('orderBeverageOnly(): 주문이 음료 외의 다른 항목을 포함하는 경우', () => {
    const input = ['제로콜라', '티본스테이크'];
    expect(eventAlgorithm.orderBeverageOnly(input)).toBe(false);
  });

  test('calculateTotalPriceBeforeDisCount() 테스트:', () => {
    const menu = { 티본스테이크: 1, 제로콜라: 2, 초코케이크: 1 };
    const menuName = ['티본스테이크', '제로콜라', '초코케이크'];
    expect(
      eventAlgorithm.calculateTotalPriceBeforeDisCount(menu, menuName),
    ).toBe(55000 + 3000 * 2 + 15000);
  });
});

describe('핵심 로직: calculateBenefitDetail() 테스트', () => {
  let eventAlgorithm;

  beforeEach(() => {
    eventAlgorithm = new EventAlgorithm();
  });

  test('크리스마스 이벤트', () => {
    eventAlgorithm.IS_CHRISTMAS_EVENT_DAY = true;
    const date = '25';
    const menu = { 크리스마스파스타: 1 };
    const menuNameList = ['크리스마스파스타'];
    const totalPriceBeforeDisCount = 25000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );
    expect(result.christmas_discount).toBe(-(1000 + 100 * (Number(date) - 1)));
  });

  test('주말 할인', () => {
    eventAlgorithm.IS_WEEKEND = true;
    const date = '9';
    const menu = { 티본스테이크: 2 };
    const menuNameList = ['티본스테이크'];
    const totalPriceBeforeDisCount = 110000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );
    expect(result.weekend_discount).toBe(-2023 * 2);
  });

  test('평일 할인', () => {
    eventAlgorithm.IS_WEEKDAY = true;
    const date = '5';
    const menu = { 초코케이크: 3 };
    const menuNameList = ['초코케이크'];
    const totalPriceBeforeDisCount = 45000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );
    expect(result.weekday_discount).toBe(-2023 * 3);
  });

  test('특별 이벤트 할인', () => {
    eventAlgorithm.IS_SPECIAL_EVENT = true;
    const date = '10';
    const menu = { 해산물파스타: 1 };
    const menuNameList = ['해산물파스타'];
    const totalPriceBeforeDisCount = 35000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );
    expect(result.special_discount).toBe(-1000);
  });

  test('증정 메뉴 할인', () => {
    eventAlgorithm.IS_GIFT_MENU = true;
    const date = '15';
    const menu = { 바비큐립: 3 };
    const menuNameList = ['바비큐립'];
    const totalPriceBeforeDisCount = 162000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );
    expect(result.giftmenu_discount).toBe(-25000);
  });
});

describe('예외 테스트: calculateBenefitDetail()', () => {
  let eventAlgorithm;

  beforeEach(() => {
    eventAlgorithm = new EventAlgorithm();
    eventAlgorithm.IS_CHRISTMAS_EVENT_DAY = true;
    eventAlgorithm.IS_WEEKEND = true;
    eventAlgorithm.IS_WEEKDAY = false;
    eventAlgorithm.IS_SPECIAL_EVENT = true;
    eventAlgorithm.IS_GIFT_MENU = true;
  });

  test('할인 전 총 가격이 10000원 미만일 경우 할인X', () => {
    const date = '25';
    const menu = { 제로콜라: 1 };
    const menuNameList = ['제로콜라'];
    const totalPriceBeforeDisCount = 3000;

    const result = eventAlgorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );

    expect(result.christmas_discount).toBe(0);
    expect(result.weekend_discount).toBe(0);
    expect(result.weekday_discount).toBe(0);
    expect(result.special_discount).toBe(0);
    expect(result.giftmenu_discount).toBe(0);
  });
});

describe('예외 테스트', () => {
  test('날짜 예외 테스트', async () => {
    // given
    const INVALID_DATE_MESSAGE =
      '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.';
    const INPUTS_TO_END = ['1', '해산물파스타-2'];
    const logSpy = getLogSpy();
    mockQuestions(['a', ...INPUTS_TO_END]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_DATE_MESSAGE),
    );
  });

  test('주문 예외 테스트', async () => {
    // given
    const INVALID_ORDER_MESSAGE = '[ERROR]';
    const INPUTS_TO_END = ['해산물파스타-2'];
    const logSpy = getLogSpy();
    mockQuestions([
      '3',
      '제로콜라-a',
      '제로콜라-3',
      '해산물파스타-15, 제로콜라-10',
      ...INPUTS_TO_END,
    ]);

    // when
    const app = new App();
    await app.run();

    // then
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining(INVALID_ORDER_MESSAGE),
    );
  });
});
