import InputView from './InputView.js';
import OutputView from './OutputView.js';
import EventAlgorithm from './EventAlgorithm.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const date = await InputView.readDate();
    EventAlgorithm.determiningDate(date);
    const menu = await InputView.readMenu();
    OutputView.printMenu(menu);
  }
}

export default App;
