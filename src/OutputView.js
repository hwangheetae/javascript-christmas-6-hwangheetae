import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(input) {
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

    const menuItems = input.split(',');
    const menu = {};

    menuItems.forEach((item) => {
      const [menuItem, quantity] = item.split('-');
      menu[menuItem.trim()] = parseInt(quantity);
    });

    const menuName = Object.keys(menu);
    const menuQuantity = Object.values(menu);

    Console.print('<주문 메뉴>');
    for (let i = 0; i < menuName.length; i += 1) {
      Console.print(`${menuName[i]} ${menuQuantity[i]}개`);
    }

    Console.print('');
    Console.print('<할인 전 총주문 금액>');

    let totalPriceBeforeDisCount = 0;
    for (const category in MENU) {
      menuName.forEach((item) => {
        if (MENU[category][item]) {
          totalPriceBeforeDisCount += MENU[category][item] * menu[item];
        }
      });
    }

    Console.print(`${totalPriceBeforeDisCount.toLocaleString()}원\n`);

    Console.print('<증정 메뉴>');
    if (totalPriceBeforeDisCount > 120000) {
      Console.print('샴페인 1개');
    } else {
      Console.print('없음');
    }
  },
};

export default OutputView;
