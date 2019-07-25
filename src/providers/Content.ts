export type SendResponse = (response: any) => void;


class Content {

  constructor() {
    this._handleMessage = this._handleMessage.bind(this);

    chrome.runtime.onMessage.addListener(this._handleMessage);
  }

  dispatchEvent(type: string, detail: any) {
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(`prefix.${type}`, false, false, detail);
    document.dispatchEvent(evt);
  }

  _handleMessage(request: any, sender: chrome.runtime.MessageSender, sendResponse: SendResponse) {
    if (sender.tab) {
      return /* from a content script */;
    }

    // from the extension
    try {
      const json = JSON.parse(request);
      if (!json || !json.prefix) {
        return /* from other extension */;
      }

      const prefix = json.prefix;
      switch (prefix.action) {
        case 'change':
          this.dispatchEvent('update', prefix.value);
          sendResponse({
            prefix: {
              action: prefix.action,
              value: 'done',
            },
          });
          break;

        default:
          break;
      }
    } catch(err) {
      console.error(err);
    }
  }

  destroy() {
    chrome.runtime.onMessage.removeListener(this._handleMessage);
  }

}


export default Content;
