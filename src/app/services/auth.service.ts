import {Auth0DecodedHash, AuthOptions, WebAuth} from 'auth0-js'
import {Injectable} from '@angular/core'
import {Router} from '@angular/router'

const AUTH_DOMAIN = 'mxc.auth0.com'
const CLIENT_ID = '2dnwBRePVtHR3vAgV2HLp7FHOQAoUcZc'

@Injectable({providedIn: 'root'})
export class AuthService {
  protected _auth0Client: WebAuth
  private _accessToken?: string
  private userInfo?: Auth0DecodedHash['idTokenPayload']
  public authenticationInProgress = false
  private readonly _properties: AuthOptions

  constructor(private router: Router) {
    this._properties = {
      clientID: CLIENT_ID,
      domain: AUTH_DOMAIN,
      responseType: 'token id_token',
      redirectUri: `${window.location.origin}/login`,
      audience: 'https://mxc.auth0.com/api/v2/',
      scope: 'openid profile',
    }
    this._auth0Client = new WebAuth({...this._properties})
  }

  public checkSession() {
    this.authenticationInProgress = true

    this._auth0Client.checkSession({prompt: 'none'}, async (error, authResult) => {
      try {
        const parsedData = error ? await this.parseHash() : authResult

        if (parsedData) {
          this._setSession(parsedData)
        }
      } catch (err) {
        console.error(err)
      }

      this.authenticationInProgress = false
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

  public isAuthenticated() {
    return !!this._accessToken
  }

  private _setSession(authResult: Auth0DecodedHash) {
    this._accessToken = authResult.accessToken
    this.userInfo = authResult.idTokenPayload
    this.router.navigateByUrl('')
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
