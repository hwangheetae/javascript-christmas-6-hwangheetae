import { Console } from '@woowacourse/mission-utils';
import ErrorCheck from './ErrorCheck.js';

const InputView = {
  async readDate() {
    while (true) {
      const input = await Console.readLineAsync(
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
      );
      try {
        ErrorCheck.dateCheck(input);
        return input;
        break;
      } catch (error) {
        Console.print(error.message);
      }
    }
  },

  async readMenu() {
    while (true) {
      const input = await Console.readLineAsync(
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
      );
      const menuItems = input.split(',');
      const menu = {};
      const menuNameList = menuItems.map((item) => item.split('-')[0].trim());

      menuItems.forEach((item) => {
        const [menuItem, quantity] = item.split('-');
        menu[menuItem.trim()] = parseInt(quantity);
      });

      const menuName = Object.keys(menu);
      const menuQuantity = Object.values(menu);

      try {
        ErrorCheck.orderFormatCheck(input);
        ErrorCheck.orderMenuNameCheck(menuName);
        menuQuantity.forEach((quantity) => {
          ErrorCheck.orderMenuNumberCheck(quantity);
        });
        ErrorCheck.orderOverlapCheck(menuNameList);

        return input;

        break;
      } catch (error) {
        Console.print(error.message);
      }
    }

    return input;
  },
};

export default InputView;
