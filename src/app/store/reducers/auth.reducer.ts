import {AuthStore} from 'store/index'
import {AuthActionTypes, AuthActionsUnion} from 'store/actions/auth.actions'

const initialState: AuthStore = {
  isAuthenticated: false,
  isAuthenticationInProgress: false,
  userInfo: {},
}

export function authReducer(state = initialState, action: AuthActionsUnion): AuthStore {
  if (action.type === AuthActionTypes.Login) {
    return {...state, isAuthenticationInProgress: true}
  }

  if (action.type === AuthActionTypes.Logout) {
    return {...state, isAuthenticationInProgress: true}
  }

  if (action.type === AuthActionTypes.CheckSession) {
    return {...state, isAuthenticationInProgress: true}
  }

  if (action.type === AuthActionTypes.LoginSuccess) {
    return {...state, isAuthenticated: true, isAuthenticationInProgress: false, userInfo: action.payload}
  }

  if (action.type === AuthActionTypes.LoginFailure) {
    return {...state, isAuthenticated: false, isAuthenticationInProgress: false, userInfo: {}}
  }

  return state
}
