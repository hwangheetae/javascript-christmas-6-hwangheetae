import { Console } from '@woowacourse/mission-utils';
import EventAlgorithm from './EventAlgorithm.js';

const OutputView = {
  printGuideWord(date) {
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
  },

  printMenu(input) {
    const event_algorithm = new EventAlgorithm();

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
      Console.print('샴페인 1개');
    } else {
      Console.print('없음');
    }
  },
};

export default OutputView;
