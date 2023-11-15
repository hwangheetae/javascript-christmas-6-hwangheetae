import { Console } from '@woowacourse/mission-utils';
import {
  GREETING_MESSAGE,
  EVENT_PREVIEW_MESSAGE,
  ORDER_MENU_TAG_MESSAGE,
  BEFORE_DISCOUNT_TAG_MESSAGE,
  WINNING_MENU_TAG_MESSAGE,
  WINNING_MENU_YES_MESSAGE,
  NONE_MESSAGE,
} from './Constant.js';

const OutputView = {
  printGreeting() {
    Console.print(GREETING_MESSAGE);
  },

  printGuideWord(date) {
    Console.print(EVENT_PREVIEW_MESSAGE(date));
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

    this.printGiftMenu(Number(event_algorithm.isGiftMenu));

    const total_discount = this.printBenefitsDetail(
      event_algorithm,
      date,
      menuNameList,
      menu,
      totalPriceBeforeDisCount,
    );
    this.printTotalDiscount(total_discount);

    this.printFinalPrice(
      event_algorithm.isGiftMenu,
      totalPriceBeforeDisCount,
      total_discount,
    );

    this.printEventBadge(total_discount);
  },

  printOrder(menuName, menuQuantity) {
    Console.print(ORDER_MENU_TAG_MESSAGE);
    for (let i = 0; i < menuName.length; i += 1) {
      Console.print(`${menuName[i]} ${menuQuantity[i]}개`);
    }
    Console.print('');
  },

  printPriceBeforeDiscount(event_algorithm, menu, menuName) {
    Console.print(BEFORE_DISCOUNT_TAG_MESSAGE);
    const totalPriceBeforeDisCount =
      event_algorithm.calculateTotalPriceBeforeDisCount(menu, menuName);
    Console.print(`${totalPriceBeforeDisCount.toLocaleString()}원\n`);
    return totalPriceBeforeDisCount;
  },

  printGiftMenu(valid) {
    Console.print(WINNING_MENU_TAG_MESSAGE);
    if (valid) {
      Console.print(WINNING_MENU_YES_MESSAGE);
    } else {
      Console.print(NONE_MESSAGE);
    }
  },

  printBenefitsDetail(
    event_algorithm,
    date,
    menuNameList,
    menu,
    totalPriceBeforeDisCount,
  ) {
    let total_discount = 0;

    Console.print('<혜택 내역>');

    const discounts = event_algorithm.calculateBenefitDetail(
      date,
      menu,
      menuNameList,
      totalPriceBeforeDisCount,
    );

    const discountTypes = [
      { key: 'christmas_discount', label: '크리스마스 디데이 할인' },
      { key: 'weekday_discount', label: '평일 할인' },
      { key: 'weekend_discount', label: '주말 할인' },
      { key: 'special_discount', label: '특별 할인' },
      { key: 'giftmenu_discount', label: '증정 이벤트' },
    ];

    discountTypes.forEach(({ key, label }) => {
      if (discounts[key] !== 0) {
        Console.print(`${label}: ${discounts[key].toLocaleString()}원`);
        total_discount += discounts[key];
      }
    });

    if (total_discount === 0) {
      Console.print(NONE_MESSAGE);
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

    const badges = [
      { threshold: 20000, label: '산타' },
      { threshold: 10000, label: '트리' },
      { threshold: 5000, label: '별' },
    ];

    const badge = badges.find((badge) => total_discount >= badge.threshold) || {
      label: NONE_MESSAGE,
    };
    Console.print(badge.label);
  },
};

export default OutputView;
