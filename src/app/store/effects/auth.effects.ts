import {Injectable} from '@angular/core'
import {Actions, Effect, ofType} from '@ngrx/effects'
import {AppStore, AuthActions} from 'store/index'
import {tap} from 'rxjs/operators'
import {Store} from '@ngrx/store'
import {Router} from '@angular/router'

@Injectable()
export class AuthEffects {
  constructor(private actions: Actions<AuthActions.AuthActionsUnion>, private store: Store<AppStore>, private router: Router) {}

  @Effect({dispatch: false})
  loginSuccess = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.LoginSuccess),
    tap(() => {
      this.store.select(s => s.auth.isAuthenticated).subscribe(isAuthenticated => {
        if (isAuthenticated && this.router.isActive('/login', false)) {
          this.router.navigateByUrl('')
        }
      })
    }),
  )

  @Effect({dispatch: false})
  loginFailure = this.actions.pipe(
    ofType(AuthActions.AuthActionTypes.LoginFailure),
    tap(() => this.router.navigateByUrl('/login')),
  )
}
