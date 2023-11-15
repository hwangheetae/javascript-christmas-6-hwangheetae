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

  async readMenu(event_algorithm) {
    while (true) {
      const input = await Console.readLineAsync(
        '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
      );
      const { menu, menuName, menuQuantity, menuNameList } =
        event_algorithm.userOrder(input);

      try {
        ErrorCheck.orderFormatCheck(input);
        ErrorCheck.orderMenuNameCheck(event_algorithm, menuName);
        menuQuantity.forEach((quantity) => {
          ErrorCheck.orderMenuNumberCheck(quantity);
        });
        ErrorCheck.orderOverlapCheck(menuNameList);
        ErrorCheck.menuNumberMaxCheck(menuQuantity);
        ErrorCheck.onlyBeverageCheck(event_algorithm, menuName);
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
