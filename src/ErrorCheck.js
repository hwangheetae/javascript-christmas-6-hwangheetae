import {
  INVALID_DATE_MESSAGE,
  INVALID_ORDER_MESSAGE,
  INVALID_MAX_ORDER_MESSAGE,
  INVALID_BEVERAGE_ONLY_MESSAGE,
} from './Constant.js';

class ErrorCheck {
  static dateCheck(input) {
    input = Number(input);
    if (input > 31 || input < 1 || isNaN(input)) {
      throw new Error(INVALID_DATE_MESSAGE);
    }
  }

  static orderMenuNameCheck(event_algorithm, input) {
    const isValidNameOrder = event_algorithm.findOrderInMenu(input);
    if (!isValidNameOrder) {
      throw new Error(INVALID_ORDER_MESSAGE);
    }
  }

  static orderMenuNumberCheck(input) {
    input = Number(input);
    if (input < 1 || isNaN(input)) {
      throw new Error(INVALID_ORDER_MESSAGE);
    }
  }

  static orderFormatCheck(input) {
    const pattern = /^.+-\d+(,.+-.+)*$/;
    if (!pattern.test(input)) {
      throw new Error(INVALID_ORDER_MESSAGE);
    }
  }

  static orderOverlapCheck(input) {
    if (new Set(input).size !== input.length) {
      throw new Error(INVALID_ORDER_MESSAGE);
    }
  }

  static menuNumberMaxCheck(input) {
    const sum = input.reduce((a, b) => a + b, 0);
    if (sum > 20) {
      throw new Error(INVALID_MAX_ORDER_MESSAGE);
    }
  }

  static onlyBeverageCheck(event_algorithm, input) {
    const isOnlyBeverages = event_algorithm.orderBeverageOnly(input);
    if (isOnlyBeverages) {
      throw new Error(INVALID_BEVERAGE_ONLY_MESSAGE);
    }
  }
}

export default ErrorCheck;
