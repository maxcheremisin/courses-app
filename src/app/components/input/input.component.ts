import {Component, Input, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  @Input() public type: 'text' | 'email' | 'password' | 'date' | 'number' | 'textarea' | 'search' = 'text'
  @Input() public label: string
  @Input() public placeholder= ''
  @Input() public className: string | {[key: string]: boolean}
  @Input() public onKeyDown: (e: KeyboardEvent) => void
  @Input() public onInput: (e: KeyboardEvent) => void
  @Input() public field: string
  @Input() public model: {[K: string]: string} = {}

  public iconType = iconType

  public handleKeyDown(e: KeyboardEvent) {
    if (this.onKeyDown) {
      this.onKeyDown(e)
    }
  }

  public handleInput(e: KeyboardEvent) {
    if (this.onInput) {
      this.onInput(e)
    }
  }

  public getClassName() {
    const className = typeof this.className === 'string' ? {[this.className]: true} : this.className
    return {
      ...className,
      'input__field': true,
      'input__field--search': this.type === 'search',
    }
  }
}
