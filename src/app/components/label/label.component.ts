import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-label',
  template: `
    <dl class="label">
      <dt class="label__caption">{{caption}}</dt>
      <dd class="label__value">{{value}}</dd>
    </dl>
  `,
  styleUrls: ['./label.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelComponent implements OnInit {
  @Input()
  public caption: string

  @Input()
  public value: string

  constructor() {}

  ngOnInit() {}
}
