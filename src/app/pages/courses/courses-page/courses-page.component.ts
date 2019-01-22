import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from '../courses.service'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public courses: CourseItem[] = []

  private reload = (query?: string) => {
    this.courseService.getCourses(query).then(courses => {
      this.courses = courses
    })
  }

  public onCourseSearch(query: string) {
    this.reload(query)
  }

  ngOnInit() {
    this.reload()
  }
}
