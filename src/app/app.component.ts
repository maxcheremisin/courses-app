import {Component} from '@angular/core'
import {AuthService} from 'services/auth.service'
import {BlockerService} from 'services/blocker.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public auth: AuthService, public blocker: BlockerService) {
    auth.checkSession()
  }
}
