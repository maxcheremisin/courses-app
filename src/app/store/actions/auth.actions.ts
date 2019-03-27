import {Action} from '@ngrx/store'
import {AuthStore} from 'store/types'

export enum AuthActionTypes {
  Login = 'LOGIN',
  Logout = 'LOGOUT',
  CheckSession = 'CHECK_SESSION',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginFailure = 'LOGIN_FAILURE',
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout
}

export class CheckSession implements Action {
  readonly type = AuthActionTypes.CheckSession
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess

  constructor(public payload: AuthStore['userInfo']) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure
}

export type AuthActionsUnion = Login | Logout | CheckSession | LoginSuccess | LoginFailure
