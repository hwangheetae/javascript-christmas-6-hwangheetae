import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printGreeting() {
    Console.print('안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.');
  },

  printGuideWord(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
  },

  printMenu(event_algorithm, input, date) {
    const { menu, menuName, menuQuantity, menuNameList } =
      event_algorithm.userOrder(input);

    this.printOrder(menuName, menuQuantity);

    const totalPriceBeforeDisCount = this.printPriceBeforeDiscount(
      event_algorithm,
      menu,
      menuName,
    );
    const giftMenuValid = event_algorithm.willGetGiftMenu(
      totalPriceBeforeDisCount,
    );

    this.printGiftMenu(Number(event_algorithm.IS_GIFT_MENU));
    const total_discount = this.printBenefitsDetail(
      event_algorithm,
      date,
      menuNameList,
      menu,
    );
    this.printTotalDiscount(total_discount);
    this.printFinalPrice(
      event_algorithm.IS_GIFT_MENU,
      totalPriceBeforeDisCount,
      total_discount,
    );
    this.printEventBadge(total_discount);
  },

  printOrder(menuName, menuQuantity) {
    Console.print('<주문 메뉴>');
    for (let i = 0; i < menuName.length; i += 1) {
      Console.print(`${menuName[i]} ${menuQuantity[i]}개`);
    }
    Console.print('');
  },

  printPriceBeforeDiscount(event_algorithm, menu, menuName) {
    Console.print('<할인 전 총주문 금액>');
    const totalPriceBeforeDisCount =
      event_algorithm.calculateTotalPriceBeforeDisCount(menu, menuName);
    Console.print(`${totalPriceBeforeDisCount.toLocaleString()}원\n`);
    return totalPriceBeforeDisCount;
  },

  printGiftMenu(valid) {
    Console.print('<증정 메뉴>');
    if (valid) {
      Console.print('샴페인 1개\n');
    } else {
      Console.print('없음\n');
    }
  },

  printBenefitsDetail(event_algorithm, date, menuNameList, menu) {
    let total_discount = 0;

    Console.print('<혜택 내역>');

    const {
      christmas_discount,
      weekday_discount,
      weekend_discount,
      special_discount,
      giftmenu_discount,
    } = event_algorithm.calculateBenefitDetail(date, menu, menuNameList);

    if (christmas_discount != 0) {
      Console.print(
        `크리스마스 디데이 할인: ${christmas_discount.toLocaleString()}원`,
      );
      total_discount += christmas_discount;
    }

    if (weekday_discount != 0) {
      Console.print(`평일 할인: ${weekday_discount.toLocaleString()}원`);
      total_discount += weekday_discount;
    }

    if (weekend_discount != 0) {
      Console.print(`주말 할인: ${weekend_discount.toLocaleString()}원`);
      total_discount += weekend_discount;
    }

    if (special_discount != 0) {
      Console.print(`특별 할인: ${special_discount.toLocaleString()}원`);
      total_discount += special_discount;
    }

    if (giftmenu_discount != 0) {
      Console.print(`증정이벤트: ${giftmenu_discount.toLocaleString()}원`);
      total_discount += giftmenu_discount;
    }

    if (
      christmas_discount === 0 &&
      weekday_discount === 0 &&
      weekend_discount === 0 &&
      special_discount === 0 &&
      giftmenu_discount === 0
    ) {
      Console.print('없음');
    }

    return total_discount;
  },

  printTotalDiscount(total_discount) {
    Console.print('\n<총혜택 금액>');
    Console.print(`${total_discount.toLocaleString()}원\n`);
  },

  printFinalPrice(isWine, totalPriceBeforeDisCount, total_discount) {
    Console.print('<할인 후 예상 결제 금액>');
    let FINAL_PRICE = totalPriceBeforeDisCount + total_discount;
    if (isWine) {
      FINAL_PRICE += 25000;
    }
    Console.print(`${FINAL_PRICE.toLocaleString()}원\n`);
  },

  printEventBadge(total_discount) {
    total_discount *= -1;
    Console.print('<12월 이벤트 배지>');
    if (total_discount >= 20000) Console.print('산타');
    else if (total_discount >= 10000) Console.print('트리');
    else if (total_discount >= 5000) Console.print('별');
    else Console.print('없음');
  },
};

export default OutputView;
// 5천이상: 별
// 1만원 이상 : 트리
// 2만원 이상 : 산타
