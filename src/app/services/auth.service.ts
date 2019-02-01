import {EventEmitter, Injectable} from '@angular/core'

interface UserInfo {
  login: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private static StorageKey = 'angular-auth'

  constructor() {
    this.authUpdater = new EventEmitter()
    this.authUpdater.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn
    })

    if (AuthService.storage) {
      this.userInfo = AuthService.storage
      this.authUpdater.emit(true)
    }
  }

  protected userInfo: UserInfo | null
  public authUpdater: EventEmitter<boolean>
  public isLoggedIn: boolean

  private static clearStorage() {
    localStorage.removeItem(AuthService.StorageKey)
  }
  private static set storage(userInfo: UserInfo) {
    localStorage.setItem(AuthService.StorageKey, JSON.stringify(userInfo))
  }
  private static get storage() {
    const value = localStorage.getItem(AuthService.StorageKey)
    return value ? JSON.parse(value) : null
  }

  public logIn(login: string, password: string) {
    if ((login === 'maxim' || login === 'ruslan') && password === '1234') {
      this.authUpdater.emit(true)
      this.userInfo = {login}

      AuthService.storage = this.userInfo
    }
  }

  public logOut() {
    if (this.isLoggedIn) {
      this.authUpdater.emit(false)
      this.userInfo = null

      AuthService.clearStorage()
    }
  }

  public getUserInfo() {
    return this.userInfo
  }
}
