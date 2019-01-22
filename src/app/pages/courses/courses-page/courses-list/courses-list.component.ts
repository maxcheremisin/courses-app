import {Component, Input, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-list.component.less'],
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor() {}

  @Input()
  public coursesList: CourseItem[]

  @Input()
  public reload: () => void

  ngOnInit() {}
}
