class Background {

  constructor() {
    this._handleTabUpdate = this._handleTabUpdate.bind(this);

    chrome.tabs.onUpdated.addListener(this._handleTabUpdate);
  }

  getPopup() {
    return chrome.extension.getViews({type: 'popup'})[0];
  }

  send(tabId: number, prefix: any) {
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(tabId, JSON.stringify({prefix}), resolve);
    });
  }

  setIconAndPopup(tabId: number, disabled: boolean) {
    const str = disabled ? '.disabled' : '';
    chrome.browserAction.setIcon({
      tabId: tabId,
      path: {
        '16': `assets/images/logo16${str}.png`,
        '32': `assets/images/logo32${str}.png`,
        '48': `assets/images/logo48${str}.png`,
        '128': `assets/images/logo128${str}.png`,
      },
    });
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: (disabled ? 'disabled' : 'popup') + '.html',
    });
  }

  _handleTabUpdate(tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) {
    if (changeInfo.status === 'loading') {
      this.setIconAndPopup(tabId, !tab.url);
    }
  }

  destroy() {
    chrome.tabs.onUpdated.removeListener(this._handleTabUpdate);
  }

}


export default Background;
