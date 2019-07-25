import styles from './button.less';
import UIButton from '../../elements/UIButton';


class Button extends UIButton {

  protected _primary: boolean = false;

  constructor(text?: string) {
    super();

    styles.use();
    this.classList.add(styles.locals.button);

    if(text) {
      this.text = text;
    }
  }

  get primary() {
    return this._primary;
  }

  set primary(primary) {
    this.classList[primary ? 'add' : 'remove'](styles.locals.primary);
    this._primary = primary;
  }

  destroy() {
    super.destroy();

    styles.unuse();
  }

}


export default Button;
