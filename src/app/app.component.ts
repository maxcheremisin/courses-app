import {Component} from '@angular/core'
import {BlockerService} from 'services/blocker.service'
import {AppStore, AuthActions} from 'store/index'
import {Store} from '@ngrx/store'
import {AuthService} from 'services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public auth: AuthService, public blocker: BlockerService, private store: Store<AppStore>) {
    auth.checkSession()

    this.store.dispatch(new AuthActions.CheckSession())

    this.store.select(state => state.auth.isAuthenticationInProgress).subscribe(isLoading => {
      this.isLoading = isLoading
    })
  }

  public isLoading = false
}
