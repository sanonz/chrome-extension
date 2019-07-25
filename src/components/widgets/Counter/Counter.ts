import styles from './counter.less';
import UIDiv from '../../elements/UIDiv';
import UIText from '../../elements/UIText';
import Button from '../Button';


class Counter extends UIDiv {

  protected _count: number = 0;

  public elementText: UIText;

  constructor() {
    super();

    this._handleIncrement = this._handleIncrement.bind(this);
    this._handleDecrement = this._handleDecrement.bind(this);

    styles.use();
    this.classList.add(styles.locals.counter);

    const count = new UIDiv();
    count.classList.add(styles.locals.count);
    const text = new UIText(this.count.toString());
    this.elementText = text;
    count.append(text);
    this.append(count);

    const deBtn = new Button('-');
    deBtn.on('native.click', this._handleDecrement);
    this.append(deBtn);

    const inBtn = new Button('+');
    inBtn.primary = true;
    inBtn.on('native.click', this._handleIncrement);
    this.append(inBtn);
  }

  get count() {
    return this._count;
  }

  set count(count) {
    this._count = count;
    this.elementText.text = count.toString();

    this.emit('change', count);
  }

  _handleDecrement(evt: MouseEvent) {
    this.count--;
  }

  _handleIncrement(evt: MouseEvent) {
    this.count++;
  }

  destroy() {
    super.destroy();

    styles.unuse();
  }

}


export default Counter;
