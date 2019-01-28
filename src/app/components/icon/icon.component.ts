import {Component, Input} from '@angular/core'

@Component({
  selector: 'app-icon',
  template: `
    <span [ngClass]="className" (click)="handleClick($event)">
      <svg version="1.1" viewBox="0 0 24 24" style="display:inline-block;width:2.4rem;position: relative;top: 1px;">
        <path [attr.d]="type" d="M13,14H11V10H13M13,18H11V16H13M1,21H23L12,2L1,21Z" />
      </svg>
    </span>
  `,
})
export class IconComponent {
  @Input()
  public type: string

  @Input()
  public className: string | {[key: string]: boolean}

  @Input()
  public onClick?: (e: Event) => void

  public handleClick(e: Event) {
    if (this.onClick) {
      this.onClick(e)
    }
  }
}
