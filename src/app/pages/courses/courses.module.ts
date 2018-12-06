import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {CoursesPageComponent} from './courses-page/courses-page.component'
import {PageHeaderComponent} from './courses-page/page-header/page-header.component'
import {CoursesListComponent} from './courses-page/courses-list/courses-list.component'
import {CourseItemComponent} from './courses-page/course-item/course-item.component'
import {ComponentsModule} from 'components/components.module'

@NgModule({
  declarations: [CoursesPageComponent, PageHeaderComponent, CoursesListComponent, CourseItemComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [CoursesPageComponent],
})
export class CoursesModule {}
