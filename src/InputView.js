import { Console } from '@woowacourse/mission-utils';
import ErrorCheck from './ErrorCheck.js';
import { VISIT_DAY_QUESTION, ORDER_QUESTION } from './Constant.js';

const InputView = {
  async readDate() {
    while (true) {
      const input = await Console.readLineAsync(VISIT_DAY_QUESTION);
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
      const input = await Console.readLineAsync(ORDER_QUESTION);
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
