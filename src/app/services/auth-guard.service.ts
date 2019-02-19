import {Injectable} from '@angular/core'
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router'
import {AuthService} from 'services/auth.service'
import {Observable} from 'rxjs'

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Observable<boolean>(observer => {
      if (this.auth.isAuthenticated()) {
        observer.next(true)
      } else {
        this.router.navigateByUrl('/login', {skipLocationChange: true, replaceUrl: true})
        observer.next(false)
      }

      observer.complete()
    })
  }
}
