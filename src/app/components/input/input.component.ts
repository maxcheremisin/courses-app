import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class InputComponent {
  @Input() public type: 'text' | 'email' | 'password' | 'date' | 'number' | 'textarea' = 'text'
  @Input() public label: string
  @Input() public placeholder: string
  @Input() public className: string | {[key: string]: boolean}
  @Input() public onKeyDown: (e: KeyboardEvent) => void
  @Output()
  public fieldChange = new EventEmitter<string>()
  public fieldValue = ''
  @Input()
  public set field(value: string) {
    this.fieldValue = value
    this.fieldChange.emit(this.fieldValue)
  }

  public handleKeyDown(e: KeyboardEvent) {
    if (this.onKeyDown) {
      this.onKeyDown(e)
    }
  }

  public getClassName() {
    const className = typeof this.className === 'string' ? {[this.className]: true} : this.className
    return {
      ...className,
      'input__field': true,
    }
  }
}
