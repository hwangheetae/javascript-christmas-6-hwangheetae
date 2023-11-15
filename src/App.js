import InputView from './InputView.js';
import OutputView from './OutputView.js';
import EventAlgorithm from './EventAlgorithm.js';
import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const event_algorithm = new EventAlgorithm();

    OutputView.printGreeting();

    const date = await InputView.readDate();
    const menu = await InputView.readMenu(event_algorithm);

    event_algorithm.determiningDate(date);

    OutputView.printGuideWord(date);
    OutputView.printMenu(event_algorithm, menu, date);
  }
}

export default App;
