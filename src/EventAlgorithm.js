import { Console } from '@woowacourse/mission-utils';

class EventAlgorithm {
  static determiningDate(date) {
    // 1~25일
    // 총주문금액 - (1000 +100 x (day -1))
    const CHRISTMAS_EVENT_DAY = Array.from({ length: 25 }, (_, i) => i + 1);

    // => 메인메뉴 1개당 2023할인
    const WEEKEND = [1, 2, 8, 9, 15, 16, 22, 23, 29, 30];

    // [3,4,5,6,7,10,11,12,13,14,17,18,19,20,21,24,25,26,27,28,31]
    // => 디저트메뉴 1개당 2023원 할인
    const WEEKDAY = Array.from({ length: 31 }, (_, i) => i + 1).filter(
      (x) => !WEEKEND.includes(x),
    );

    // => 총 주문 금액 - 1000원 할인
    const SPECIAL_EVENT_DAY = [3, 10, 17, 24, 25, 31];

    Console.print(`입력받은 요일은 ${Number(date)}`);

    if (CHRISTMAS_EVENT_DAY.includes(Number(date))) {
      Console.print('크리스마스 이벤트날!');
    }

    if (WEEKEND.includes(Number(date))) {
      Console.print('주말!');
    }
    if (WEEKDAY.includes(Number(date))) {
      Console.print('평일!');
    }

    if (SPECIAL_EVENT_DAY.includes(Number(date))) {
      Console.print('스페셜 이벤트날!');
    }
  }
}

export default EventAlgorithm;
