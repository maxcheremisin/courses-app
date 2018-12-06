import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {courseList} from 'mocks/course-list.mock'

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor() {}

  public courses: CourseItem[] = courseList

  ngOnInit() {}
}
