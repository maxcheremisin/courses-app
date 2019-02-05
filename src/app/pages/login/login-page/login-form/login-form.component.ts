import {Component, ViewEncapsulation} from '@angular/core'
import {AuthService} from 'services/auth.service'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginFormComponent {
  constructor(private auth: AuthService) {}

  public onLogin = () => {
    this.auth.login()
  }
}
