import { Console } from '@woowacourse/mission-utils';

class EventAlgorithm {
  constructor() {
    this.IS_CHRISTMAS_EVENT_DAY = false;
    this.IS_WEEKEND = false;
    this.IS_WEEKDAY = false;
    this.IS_SPECIAL_EVENT = false;
    this.IS_GIFT_MENU = false;
    this.IS_EVENT_BADGE = false;
  }

  determiningDate(date) {
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
      this.IS_CHRISTMAS_EVENT_DAY = true;
    }

    if (WEEKEND.includes(Number(date))) {
      this.IS_WEEKEND = true;
    }
    if (WEEKDAY.includes(Number(date))) {
      this.IS_WEEKDAY = true;
    }

    if (SPECIAL_EVENT_DAY.includes(Number(date))) {
      this.IS_SPECIAL_EVENT = true;
    }
  }
}

export default EventAlgorithm;
