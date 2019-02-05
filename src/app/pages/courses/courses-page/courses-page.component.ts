import {Component, OnInit} from '@angular/core'
import {AuthService} from 'services/auth.service'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from '../courses.service'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit {
  constructor(private courseService: CoursesService, private auth: AuthService) {}

  public courses: CourseItem[] = []

  public ngOnInit() {
    this.courseService.courseUpdater.subscribe((courses: CourseItem[]) => {
      this.courses = courses
    })

    this.reload()
  }

  public reload = (query?: string) => {
    this.courseService.getCourses(query).then(courses => {
      this.courses = courses
    })
  }

  public onCourseSearch(query: string) {
    this.reload(query)
  }
}
