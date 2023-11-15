import { Console } from '@woowacourse/mission-utils';

const MENU = {
  //category
  애피타이저: {
    //name       //price
    양송이수프: 6000,
    타파스: 5500,
    시저샐러드: 8000,
  },
  메인: {
    티본스테이크: 55000,
    바비큐립: 54000,
    해산물파스타: 35000,
    크리스마스파스타: 25000,
  },
  디저트: {
    초코케이크: 15000,
    아이스크림: 5000,
  },
  음료: {
    제로콜라: 3000,
    레드와인: 60000,
    샴페인: 25000,
  },
};

class EventAlgorithm {
  constructor() {
    this.IS_CHRISTMAS_EVENT_DAY = false;
    this.IS_WEEKEND = false;
    this.IS_WEEKDAY = false;
    this.IS_SPECIAL_EVENT = false;
    this.IS_GIFT_MENU = false;
    this.IS_EVENT_BADGE = false;
  }

  get isChristmasEventDay() {
    return this.IS_CHRISTMAS_EVENT_DAY;
  }

  get isWeekend() {
    return this.IS_WEEKEND;
  }

  get isWeekday() {
    return this.IS_WEEKDAY;
  }

  get isSpecialEvent() {
    return this.IS_SPECIAL_EVENT;
  }

  get isGiftMenu() {
    return this.IS_GIFT_MENU;
  }

  get isEventBadge() {
    return this.IS_EVENT_BADGE;
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

  userOrder(input) {
    const menuItems = input.split(',');

    const menu = {};
    const menuNameList = menuItems.map((item) => item.split('-')[0].trim());

    menuItems.forEach((item) => {
      const [menuItem, quantity] = item.split('-');
      menu[menuItem.trim()] = parseInt(quantity);
    });

    const menuName = Object.keys(menu);
    const menuQuantity = Object.values(menu);

    return { menu, menuName, menuQuantity, menuNameList };
  }

  findOrderInMenu(input) {
    const MENU_NAME_LIST = Object.values(MENU).reduce((acc, category) => {
      return acc.concat(Object.keys(category));
    }, []);

    const isValidNameOrder = input.every((item) =>
      MENU_NAME_LIST.includes(item),
    );

    return isValidNameOrder;
  }

  orderBeverageOnly(input) {
    const isOnlyBeverages = input.every((item) => {
      return Object.keys(MENU.음료).includes(item);
    });
    return isOnlyBeverages;
  }

  calculateTotalPriceBeforeDisCount(menu, menuName) {
    let totalPriceBeforeDisCount = 0;

    for (const category in MENU) {
      menuName.forEach((item) => {
        if (MENU[category][item]) {
          totalPriceBeforeDisCount += MENU[category][item] * menu[item];
        }
      });
    }
    return totalPriceBeforeDisCount;
  }

  willGetGiftMenu(price) {
    if (price > 120000) {
      this.IS_GIFT_MENU = true;
    }
  }

  calculateBenefitDetail(date, menu, menuNameList, totalPriceBeforeDisCount) {
    let christmas_discount = 0;
    let weekday_discount = 0;
    let weekend_discount = 0;
    let special_discount = 0;
    let giftmenu_discount = 0;

    if (totalPriceBeforeDisCount >= 10000) {
      if (this.IS_CHRISTMAS_EVENT_DAY) {
        christmas_discount = -(1000 + 100 * (Number(date) - 1));
      }

      if (this.IS_WEEKEND) {
        let count = 0;
        menuNameList.forEach((item) => {
          if (this.findCategoryOfMenu(item) === '메인') {
            count += menu[item];
          }
        });
        weekend_discount = -2023 * count;
      }

      if (this.IS_WEEKDAY) {
        let count = 0;
        menuNameList.forEach((item) => {
          if (this.findCategoryOfMenu(item) === '디저트') {
            count += menu[item];
          }
        });
        weekday_discount = -2023 * count;
      }

      if (this.IS_SPECIAL_EVENT) {
        special_discount = -1000;
      }

      if (this.IS_GIFT_MENU) {
        giftmenu_discount = -25000;
      }
    }

    return {
      christmas_discount,
      weekday_discount,
      weekend_discount,
      special_discount,
      giftmenu_discount,
    };
  }

  findCategoryOfMenu(menuItem) {
    for (const category in MENU) {
      if (Object.keys(MENU[category]).includes(menuItem)) {
        return category;
      }
    }
    return null;
  }
}

export default EventAlgorithm;
