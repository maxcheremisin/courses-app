import {Component, EventEmitter, Input, Output} from '@angular/core'
import {Option} from 'types/index'

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
})
export class SelectComponent {
  @Input()
  public options: Option[] = []

  @Input()
  public label?: string

  @Output()
  public change = new EventEmitter<Option['value']>()

  public handleChange(e: Event) {
    e.stopPropagation()

    this.change.emit((e.target as HTMLSelectElement).value)
  }
}
