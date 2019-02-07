import {Auth0DecodedHash, AuthOptions, WebAuth} from 'auth0-js'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

const AUTH_DOMAIN = 'mxch.auth0.com'
const CLIENT_ID = 'SEfVOUZ18dFs6dnbPsyUKzVQyq7YQ6Xv'

@Injectable({providedIn: 'root'})
export class AuthService {
  protected _auth0Client: WebAuth
  private _accessToken?: string
  private isInitialized = false
  private userInfo?: Auth0DecodedHash['idTokenPayload']
  public authenticationInProgress = false
  private readonly _properties: AuthOptions

  constructor(private router: Router) {
    this._properties = {
      clientID: CLIENT_ID,
      domain: AUTH_DOMAIN,
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/login`,
      audience: `https://${AUTH_DOMAIN}/api/v2/`,
      scope: 'openid profile email',
    }
    this._auth0Client = new WebAuth({...this._properties})
  }

  public checkSession() {
    this.authenticationInProgress = true

    return new Promise<void>((resolve, reject) => {
      this._auth0Client.checkSession({prompt: 'none'}, async (error, authResult) => {
        try {
          const parsedData = error ? await this.parseHash() : authResult

          if (parsedData) {
            this._setSession(parsedData)
          } else {
            this.storageAuth = false
          }
        } catch (err) {
          console.error(err)
          this.storageAuth = false
          await reject()
        }

        this.authenticationInProgress = false
        this.isInitialized = true
        if (this.isAuthenticated() && this.router.isActive('/login', false)) {
          this.router.navigateByUrl('')
        }
        await resolve()
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

  private get storageAuth() {
    return localStorage.getItem('isAuthenticated') === 'success'
  }

  private set storageAuth(value: boolean) {
    if (value) {
      localStorage.setItem('isAuthenticated', 'success')
    } else {
      localStorage.removeItem('isAuthenticated')
      this.router.navigateByUrl('/login')
    }
  }

  public isAuthenticated() {
    if (!this.isInitialized) {
      return this.storageAuth
    }
    return !!this._accessToken
  }

  private _setSession(authResult: Auth0DecodedHash) {
    this._accessToken = authResult.accessToken
    this.userInfo = authResult.idTokenPayload
    this.storageAuth = true
  }

  public getUserInfo() {
    if (this.userInfo) {
      return this.userInfo
    }
  }

  public login() {
    this._auth0Client.authorize()
  }

  public logout() {
    delete this._accessToken
    delete this.userInfo
    this._auth0Client.logout({
      returnTo: `${window.location.origin}/login`,
    })
  }
}
