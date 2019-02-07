import {Route} from '@angular/router'
import {AuthGuardService} from 'services/auth-guard.service'
import {LoginPageComponent} from './pages/login/login-page/login-page.component'
import {CoursesListComponent} from './pages/courses/courses-list/courses-list.component'
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component'
import {CourseEditorComponent} from './pages/courses/courses-list/course-editor/course-editor.component'
import {CoursePageComponent} from './pages/courses/course-page/course-page.component'

const canActivate = [AuthGuardService]

export const Routes: Route[] = [
  {path: 'login', component: LoginPageComponent},
  {path: '', component: CoursesListComponent, canActivate},
  {path: 'course/:id', component: CoursePageComponent, canActivate},
  {path: 'course-edit/:id', component: CourseEditorComponent, outlet: 'modal', canActivate},
  {path: '**', component: PageNotFoundComponent},
]
