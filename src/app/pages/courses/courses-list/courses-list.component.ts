import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from 'services/courses.service'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public courses: CourseItem[] = []

  public ngOnInit() {
    // this.courseService.courseUpdater.subscribe((courses: CourseItem[]) => {
    //   this.courses = courses
    // })

    this.reload()
  }

  public reload = (query?: string) => {
    this.courseService.getCourses(query).subscribe(courses => {
      this.courses = courses
    })
  }

  public onCourseSearch(query: string) {
    this.reload(query)
  }
}
