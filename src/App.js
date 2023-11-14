import InputView from './InputView.js';
import OutputView from './OutputView.js';
import EventAlgorithm from './EventAlgorithm.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const date = await InputView.readDate();
    EventAlgorithm.determiningDate(date);
    const menu = await InputView.readMenu();
    Console.print(
      `12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
    );
    OutputView.printMenu(menu);
  }
}

export default App;
