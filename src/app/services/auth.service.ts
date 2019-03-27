import {Auth0DecodedHash, AuthOptions, WebAuth} from 'auth0-js'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'
import {Store} from '@ngrx/store'
import {AppStore, AuthActions} from 'store/index'

const AUTH_DOMAIN = 'mxch.auth0.com'
const CLIENT_ID = 'SEfVOUZ18dFs6dnbPsyUKzVQyq7YQ6Xv'

@Injectable({providedIn: 'root'})
export class AuthService {
  protected _auth0Client: WebAuth
  private readonly _properties: AuthOptions

  constructor(private router: Router, private store: Store<AppStore>) {
    this._properties = {
      clientID: CLIENT_ID,
      domain: AUTH_DOMAIN,
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/login`,
      audience: `https://${AUTH_DOMAIN}/api/v2/`,
      scope: 'openid profile email',
    }
    this._auth0Client = new WebAuth(this._properties)
  }

  public checkSession() {
    return new Promise<void>((resolve, reject) => {
      this._auth0Client.checkSession({prompt: 'none'}, async (error, authResult) => {
        try {
          const parsedData = error ? await this.parseHash() : authResult

          if (parsedData) {
            const userInfo = parsedData.idTokenPayload

            this.store.dispatch(new AuthActions.LoginSuccess(userInfo))
            await resolve()
          } else {
            this.store.dispatch(new AuthActions.LoginFailure())
          }
        } catch (err) {
          console.error(err)

          this.store.dispatch(new AuthActions.LoginFailure())
          await reject()
        }
      })
    })
  }

  private parseHash() {
    return new Promise<Auth0DecodedHash | null>((resolve, reject) => {
      this._auth0Client.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else {
          resolve(authResult)
        }
      })
    })
  }

  public login() {
    this._auth0Client.authorize()
  }

  public logout() {
    this._auth0Client.logout({
      returnTo: `${window.location.origin}/login`,
    })
  }
}
