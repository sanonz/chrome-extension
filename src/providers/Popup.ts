import styles from '../app.less';
import UIDiv from '../components/elements/UIDiv';
import Counter from '..//components/widgets/Counter';
import Background from './Background';


class Popup extends UIDiv {

  public bg: Background;

  constructor() {
    super();

    this._handleChange = this._handleChange.bind(this);

    styles.use();
    this.dispatcher = this.dispatcher.bind(this);
    this.bg = this.getBackground();

    const counter = new Counter();
    counter.on('change', this._handleChange);
    this.append(counter);
  }

  getTabId(): Promise<number> {
    return new Promise((resolve) => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => resolve(tabs[0].id));
    });
  }

  getBackground() {
    const page = chrome.extension.getBackgroundPage();
    const bg: Background = (page as any).bg;

    return bg;
  }

  dispatcher(json: any) {
    if (!json || !json.prefix) {
      return;
    }

    const prefix = json.prefix;
    switch (prefix.action) {
      case 'change':
        console.log(prefix.value);
        break;

      default:
        break;
    }
  }

  async _handleChange(count: number) {
    const tabId = await this.getTabId();
    this.bg.send(tabId, {action: 'change', value: count}).then(this.dispatcher);
  }

  destroy() {
    super.destroy();

    styles.unuse();
  }

}


export default Popup;
