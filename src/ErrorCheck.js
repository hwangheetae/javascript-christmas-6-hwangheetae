class ErrorCheck {
  static dateCheck(input) {
    input = Number(input);
    if (input > 31 || input < 1 || isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static orderMenuNameCheck(event_algorithm, input) {
    const isValidNameOrder = event_algorithm.findOrderInMenu(input);
    if (!isValidNameOrder) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static orderMenuNumberCheck(input) {
    input = Number(input);
    if (input < 1 || isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static orderFormatCheck(input) {
    const pattern = /^.+-\d+(,.+-.+)*$/;
    if (!pattern.test(input)) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static orderOverlapCheck(input) {
    if (new Set(input).size !== input.length) {
      throw new Error('[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.');
    }
  }

  static menuNumberMaxCheck(input) {
    const sum = input.reduce((a, b) => a + b, 0);
    if (sum > 20) {
      throw new Error(
        '[ERROR] 메뉴는 20개까지만 주문할 수 있습니다. 다시 주문해 주세요',
      );
    }
  }

  static onlyBeverageCheck(event_algorithm, input) {
    const isOnlyBeverages = event_algorithm.orderBeverageOnly(input);
    if (isOnlyBeverages) {
      throw new Error(
        '[ERROR] 음료만 주문할 수 없습니다. 다른 메뉴를 추가해 주세요.',
      );
    }
  }
}

export default ErrorCheck;
