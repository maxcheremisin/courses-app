import {Component} from '@angular/core'

@Component({
  selector: 'app-loader',
  styleUrls: ['./loader.component.less'],
  template: `
    <div class="loader">
      <div class="loader__spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  `,
})
export class LoaderComponent {}
