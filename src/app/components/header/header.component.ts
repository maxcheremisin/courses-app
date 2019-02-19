import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService) {}

  public userInfo = {}

  public isAuthenticated() {
    return this.auth.isAuthenticated()
  }

  public onLogOut = () => {
    this.auth.logout()
  }

  public ngOnInit() {
    this.auth.getUserInfo.subscribe(userInfo => {
      this.userInfo = userInfo
    })
  }
}
