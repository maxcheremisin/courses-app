import {Component, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'
import {AppStore, AuthActions} from 'store/index'
import {Store} from '@ngrx/store'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginFormComponent {
  constructor(private auth: AuthService, private store: Store<AppStore>) {}

  public onLogin = () => {
    this.store.dispatch(new AuthActions.Login())
    this.auth.login()
  }
}
