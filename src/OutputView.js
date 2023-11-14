import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(input) {
    Console.print('<주문 메뉴>');
    const menuItems = input.split(',');
    const menu = {};

    menuItems.forEach((item) => {
      const [menuItem, quantity] = item.split('-');
      menu[menuItem.trim()] = parseInt(quantity);
    });

    const menuKey = Object.keys(menu);
    const menuQuantity = Object.values(menu);
    for (let i = 0; i < menuKey.length; i += 1) {
      Console.print(`${menuKey[i]} ${menuQuantity[i]}개`);
    }
  },
};

export default OutputView;
