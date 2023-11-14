class ErrorCheck {
  static dateCheck(input) {
    input = Number(input);
    if (input > 31 || input < 1 || isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }
}

export default ErrorCheck;
