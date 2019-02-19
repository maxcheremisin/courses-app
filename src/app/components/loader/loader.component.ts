import {Component} from '@angular/core'

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.less'],
  template: `
    <div class="loader">
      <app-spinner></app-spinner>
    </div>
  `,
})
export class LoaderComponent {}
