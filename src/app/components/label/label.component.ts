import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-label',
  template: `
    <div class="label">
      <app-icon [type]="iconType" class="label__icon"></app-icon>
      <span class="label__caption">{{caption}}</span>
      <span class="label__value">{{value}}</span>
    </div>
  `,
  styleUrls: ['./label.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LabelComponent implements OnInit {
  @Input()
  public caption: string

  @Input()
  public value: string

  @Input()
  public iconType: string

  constructor() {}

  ngOnInit() {}
}
