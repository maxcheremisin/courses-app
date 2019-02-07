import {Component, Input, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

interface ButtonSettings {
  bgColor?: 'transparent' | 'green' | 'blue' | 'orange'
  textColor?: 'grey' | 'blue'
  rounded?: boolean
  bold?: boolean
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

  public handleClick(e: Event) {
    e.stopPropagation()
    e.preventDefault()

    if (this.onClick) {
      this.onClick(e)
    }
  }

  public getClassName() {
    const {bgColor, textColor, rounded, bold} = this.settings

    return {
      [`button__background--${bgColor}`]: bgColor,
      [`button__text--${textColor}`]: textColor,
      [`button--rounded`]: rounded,
      [`button__text--bold`]: bold,
    }
  }
}
