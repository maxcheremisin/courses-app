import {Component, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'
import {Store} from '@ngrx/store'
import {AppStore, AuthActions} from 'store/index'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(private auth: AuthService, private store: Store<AppStore>) {
    this.store.select(s => s.auth).subscribe(({isAuthenticated, userInfo}) => {
      this.isAuthenticated = isAuthenticated
      this.userInfo = userInfo
    })
  }

  public userInfo = {}
  public isAuthenticated = false

  public onLogOut = () => {
    this.store.dispatch(new AuthActions.Logout())
    this.auth.logout()
  }
}
