import {Injectable} from '@angular/core'

@Injectable({providedIn: 'root'})
export class BlockerService {
  private _isActivated = false

  public set isActivated(value: boolean) {
    this._isActivated = value
  }

  public get isActivated() {
    return this._isActivated
  }
}
