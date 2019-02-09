import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {ActivatedRoute} from '@angular/router'
import {DatePipe} from '@angular/common'
import {CourseItem} from 'types/index'
import {CoursesService} from 'services/courses.service'

@Component({
  selector: 'app-course-editor',
  templateUrl: './course-editor.component.html',
  styleUrls: ['./course-editor.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseEditorComponent implements OnInit {
  constructor(private coursesService: CoursesService, private datePipe: DatePipe, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id
    })
  }

  public id: 'new' | number
  public prevCaption = ''

  public form: Partial<Omit<CourseItem, 'authors'> & {authors: string}> = {
    date: this.datePipe.transform(new Date(), 'yyyy-MM-dd')!,
  }

  public ngOnInit() {
    const isNew = this.id === 'new'

    if (!isNew) {
      const id = Number(this.id)

      this.coursesService.getCourseById(id).then(course => {
        if (course) {
          this.prevCaption = course.caption || ''
          this.form = {...course, authors: course.authors ? course.authors.map(a => a.name).join('; ') : ''}
        }
      })
    }
  }

  public onSubmit = (e: Event) => {
    const isNew = this.id === 'new'

    const params = {
      ...this.form,
      authors: this.form.authors && this.form.authors.split(';').map(name => ({name})),
    } as CourseItem

    if (isNew) {
      this.coursesService.createCourse(params)
    } else {
      this.coursesService.updateCourse(params)
    }
  }

  public getHeader() {
    return this.id === 'new' ? 'Add course' : `Edit ${this.prevCaption.toUpperCase()}`
  }
}
