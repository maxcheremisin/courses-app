import {Injectable} from '@angular/core'
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {AuthService} from 'services/auth.service'

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.auth.isAuthenticated()) {
      return true
    } else {
      this.router.navigateByUrl('/login', {skipLocationChange: true, replaceUrl: true})
      return false
    }
  }
}
