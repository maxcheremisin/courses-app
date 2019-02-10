import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

interface ButtonSettings {
  bgColor?: 'transparent' | 'green' | 'blue' | 'orange'
  textColor?: 'grey' | 'blue'
  rounded?: boolean
  bold?: boolean
  disabled?: boolean
  iconOnRight?: boolean
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.Native,
})
export class ButtonComponent {
  @Input()
  public className = ''

  @Input()
  public text?: string

  @Input()
  public icon?: iconType

  @Input()
  public settings: ButtonSettings = {}

  @Input()
  public onClick?: (e: Event) => void

  @Output('onClick')
  public click = new EventEmitter<Event>()

  public handleClick(e: Event) {
    e.stopPropagation()
    e.preventDefault()

    if (!this.settings.disabled) {
      if (this.onClick) {
        this.onClick(e)
      } else {
        this.click.emit(e)
      }
    }
  }

  public getClassName() {
    const {bgColor, textColor, rounded, bold, disabled} = this.settings

    return {
      [`button__background--${bgColor}`]: bgColor,
      [`button__text--${textColor}`]: textColor,
      [`button--rounded`]: rounded,
      [`button__text--bold`]: bold,
      [`button--disabled`]: disabled,
    }
  }
}
