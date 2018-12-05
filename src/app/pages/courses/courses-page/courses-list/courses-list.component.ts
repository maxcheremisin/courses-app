import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
})
export class CoursesListComponent implements OnInit {
  constructor() {}

  public courses: CourseItem[] = [
    {
      caption: 'Course 1',
    },
    {
      caption: 'Course 2',
    },
    {
      caption: 'Course 3',
    },
    {
      caption: 'Courseeeeeee',
    },
  ]

  ngOnInit() {}
}
