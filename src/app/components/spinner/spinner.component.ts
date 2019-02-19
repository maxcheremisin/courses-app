import {Component, Input, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-spinner',
  styleUrls: ['./spinner.component.less'],
  encapsulation: ViewEncapsulation.Native,
  template: `
    <div class="spinner spinner__{{color}}">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  `,
})
export class SpinnerComponent {
  @Input()
  public color: 'white' | 'green' = 'white'
}
