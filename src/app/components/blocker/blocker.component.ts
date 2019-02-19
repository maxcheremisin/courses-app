import {Component} from '@angular/core'

@Component({
  selector: 'app-blocker',
  styleUrls: ['./blocker.component.less'],
  template: `
    <div class="blocker">
      <app-spinner color="green"></app-spinner>
    </div>
  `,
})
export class BlockerComponent {}
