import {Route} from '@angular/router'
import {LoginPageComponent} from './pages/login/login-page/login-page.component'
import {CoursesPageComponent} from './pages/courses/courses-page/courses-page.component'
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component'
import {CourseEditorComponent} from './pages/courses/courses-page/course-editor/course-editor.component'

export const Routes: Route[] = [
  {path: 'login', component: LoginPageComponent},
  {path: '', component: CoursesPageComponent},
  {path: '**', component: PageNotFoundComponent},
  {path: 'course/:id', component: CourseEditorComponent, outlet: 'modal'},
]
