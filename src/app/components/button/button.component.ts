import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

interface ButtonSettings {
  bgColor?: 'transparent' | 'green' | 'blue' | 'orange'
  textColor?: 'grey' | 'blue'
  rounded?: boolean
}

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.less'],
  encapsulation: ViewEncapsulation.Native,
})
export class ButtonComponent implements OnInit {
  @Input()
  private className = ''

  @Input()
  private text?: string

  @Input()
  private icon?: iconType

  @Input()
  private settings: ButtonSettings = {}

  public getClassName() {
    const {bgColor, textColor, rounded} = this.settings

    return {
      [`button__background--${bgColor}`]: bgColor,
      [`button__text--${textColor}`]: textColor,
      [`button--rounded`]: rounded,
    }
  }

  constructor() {}

  ngOnInit() {}
}