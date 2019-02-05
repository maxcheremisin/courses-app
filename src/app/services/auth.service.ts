import {Auth0DecodedHash, AuthOptions, WebAuth} from 'auth0-js'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

const AUTH_DOMAIN = 'mxc.auth0.com'
const CLIENT_ID = '2dnwBRePVtHR3vAgV2HLp7FHOQAoUcZc'

@Injectable({providedIn: 'root'})
export class AuthService {
  protected _auth0Client: WebAuth
  private _accessToken?: string
  private userInfo?: {}
  private readonly _properties: AuthOptions

  constructor(private router: Router) {
    this._properties = {
      clientID: CLIENT_ID,
      domain: AUTH_DOMAIN,
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/`,
      audience: 'https://mxc.auth0.com/api/v2/',
      scope: 'openid profile',
    }
    this._auth0Client = new WebAuth({...this._properties})
  }

  public checkSession() {
    return new Promise<boolean>((resolve, reject) => {
      this._auth0Client.checkSession(this._properties, async (error, authResult) => {
        if (error && error.error !== 'login_required') {
          this.router.navigateByUrl('/login')
          return reject(error)
        } else if (error) {
          this.handleAuthentication()
          return resolve(false)
        }
        if (!this.isAuthenticated()) {
          this._setSession(authResult)
          this.router.navigateByUrl('')
          return resolve(true)
        }
      })
    })
  }

  private handleAuthentication() {
    this._auth0Client.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = ''
        this._setSession(authResult)
        this.router.navigateByUrl('/')
      } else if (err) {
        this.router.navigateByUrl('/login')
        console.log(err)
      }
    })
  }

  public isAuthenticated() {
    return !!this._accessToken
  }

  private _setSession(authResult: Auth0DecodedHash) {
    this._accessToken = authResult.accessToken
    this.userInfo = authResult.idTokenPayload
    window.location.hash = ''
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
