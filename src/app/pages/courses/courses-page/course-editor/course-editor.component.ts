import {Component, ViewEncapsulation} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from '../../courses.service'

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseEditorComponent {
  constructor(private coursesService: CoursesService) {}

  public form: Partial<CourseItem> & {authors?: string} = {}

  public onSubmit = (e: Event) => {
    const params = {...this.form, authors: this.form.authors && this.form.authors.split(';')} as CourseItem
    this.coursesService.createCourse(params)
  }
}
