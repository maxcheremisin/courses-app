import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CoursesModule} from './courses/courses.module'
import {LoginModule} from './login/login.module'
import {PageNotFoundComponent} from './page-not-found/page-not-found.component'

const pageModules = [CoursesModule, LoginModule]

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, ...pageModules],
  exports: [CommonModule, ...pageModules],
})
export class PagesModule {}
