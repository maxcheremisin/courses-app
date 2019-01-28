import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(public auth: AuthService) {}

  public onLogOut = () => {
    this.auth.logOut()
  }
}
