import {EventEmitter, Injectable} from '@angular/core'

interface UserInfo {
  login: string
}

@Injectable({providedIn: 'root'})
export class AuthService {
  public authUpdater: EventEmitter<boolean> = new EventEmitter()
  public isLoggedIn = false

  protected userInfo: UserInfo | null

  public logIn(login: string, password: string) {
    if ((login === 'maxim' || login === 'ruslan') && password === '1234') {
      this.isLoggedIn = true
      this.authUpdater.emit(this.isLoggedIn)
      this.userInfo = {login}
    }
  }

  public logOut() {
    if (this.isLoggedIn) {
      this.isLoggedIn = false
      this.authUpdater.emit(this.isLoggedIn)
      this.userInfo = null
    }
  }

  public getUserInfo() {
    return this.userInfo
  }
}
