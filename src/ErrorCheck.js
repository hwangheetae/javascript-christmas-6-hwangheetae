class ErrorCheck {
  static dateCheck(input) {
    input = Number(input);
    if (input > 31 || input < 1 || isNaN(input)) {
      throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
    }
  }

  static orderMenuNameCheck(input) {
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

    const MENU_NAME_LIST = Object.values(MENU).reduce((acc, category) => {
      return acc.concat(Object.keys(category));
    }, []);

    const isValidNameOrder = input.every((item) =>
      MENU_NAME_LIST.includes(item),
    );
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
}

export default ErrorCheck;
