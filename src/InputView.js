import { Console } from '@woowacourse/mission-utils';
import ErrorCheck from './ErrorCheck.js';

const InputView = {
  async readDate() {
    while (true) {
      const input = await Console.readLineAsync(
        '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)',
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
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
      );
      const menuItems = input.split(',');
      const menu = {};

      menuItems.forEach((item) => {
        const [menuItem, quantity] = item.split('-');
        menu[menuItem.trim()] = parseInt(quantity);
      });

      const menuName = Object.keys(menu);

      try {
        ErrorCheck.orderMessageCheck(menuName);
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
