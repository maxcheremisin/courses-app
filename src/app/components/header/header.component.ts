import {Component, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(private auth: AuthService) {}

  public isAuthenticated() {
    return this.auth.isAuthenticated()
  }

  public userInfo() {
    return this.auth.getUserInfo()
  }

  public onLogOut = () => {
    this.auth.logout()
  }
}
