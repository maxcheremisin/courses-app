import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CoursesModule} from './courses/courses.module'
import {LoginModule} from './login/login.module'

const pageModules = [CoursesModule, LoginModule]

@NgModule({
  declarations: [],
  imports: [CommonModule, ...pageModules],
  exports: [CommonModule, ...pageModules],
})
export class PagesModule {}
