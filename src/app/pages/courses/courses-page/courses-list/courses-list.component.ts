import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from '../../courses.service'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-list.component.less'],
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public courses: CourseItem[]

  ngOnInit() {
    this.courseService.getCourses().then(courses => {
      this.courses = courses
    })
  }
}
