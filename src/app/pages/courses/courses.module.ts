import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {RouterModule} from '@angular/router'
import {CoursesListComponent} from './courses-list/courses-list.component'
import {PageHeaderComponent} from './courses-list/page-header/page-header.component'
import {CoursesPaginatingComponent} from './courses-list/courses-paginating/courses-paginating.component'
import {CourseItemComponent} from './courses-list/course-item/course-item.component'
import {ComponentsModule} from 'components/components.module'
import {HighlightCourseDirective} from './highlight-course.directive'
import {DurationPipe} from './duration.pipe'
import {OrderByPipe} from './order-by.pipe'
import {CourseEditorComponent} from './courses-list/course-editor/course-editor.component'
import {CoursePageComponent} from './course-page/course-page.component'
import {TagInputModule} from 'ngx-chips'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    CoursesListComponent,
    PageHeaderComponent,
    CoursesPaginatingComponent,
    CourseItemComponent,
    HighlightCourseDirective,
    DurationPipe,
    OrderByPipe,
    CourseEditorComponent,
    CoursePageComponent,
  ],
  imports: [CommonModule, ComponentsModule, RouterModule, TagInputModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
  exports: [CoursesListComponent, CoursePageComponent],
})
export class CoursesModule {}
