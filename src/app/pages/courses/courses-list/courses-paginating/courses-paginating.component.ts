import {Component, Input, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-paginating.component.less'],
  templateUrl: './courses-paginating.component.html',
})
export class CoursesPaginatingComponent implements OnInit {
  constructor() {}

  @Input()
  public coursesList: CourseItem[]

  ngOnInit() {}
}
