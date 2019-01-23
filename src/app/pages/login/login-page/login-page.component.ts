import {Router} from '@angular/router'
import {Component, OnInit} from '@angular/core'
import {AuthService} from '../../../auth.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less'],
})
export class LoginPageComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  public onSubmit({email, password}: {email: string, password: string}) {
    this.auth.logIn(email, password)
  }

  ngOnInit() {
    this.auth.authUpdater.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.router.navigateByUrl('')
      }
    })
  }
}
