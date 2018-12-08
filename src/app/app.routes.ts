import {Route} from '@angular/router'
import {LoginPageComponent} from './pages/login/login-page/login-page.component'
import {CoursesPageComponent} from './pages/courses/courses-page/courses-page.component'
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component'

export const Routes: Route[] = [
  {path: 'login', component: LoginPageComponent},
  {path: '', component: CoursesPageComponent},
  {path: '**', component: PageNotFoundComponent},
]
