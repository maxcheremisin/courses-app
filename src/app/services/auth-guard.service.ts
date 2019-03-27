import {Injectable} from '@angular/core'
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {AuthService} from 'services/auth.service'
import {map, take} from 'rxjs/operators'
import {AppStore} from 'store/index'
import {Store} from '@ngrx/store'

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private store: Store<AppStore>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(s => s.auth.isAuthenticated).pipe(
      map(authed => {
        if (authed) {
          return true
        } else {
          this.router.navigateByUrl('/login', {skipLocationChange: true, replaceUrl: true})
          return false
        }
      }),
      take(1),
    )
  }
}
