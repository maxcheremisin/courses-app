import {Auth0DecodedHash} from 'auth0-js'

export interface AppStore {
  auth: AuthStore
  courses: CoursesStore
}

export interface AuthStore {
  isAuthenticated: boolean
  isAuthenticationInProgress: boolean
  userInfo: Auth0DecodedHash['idTokenPayload']
}

export type CoursesStore = object
