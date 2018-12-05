import {Component, OnInit, Input} from '@angular/core'
import {CourseItem} from 'types/course-item.types'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.css'],
})
export class CourseItemComponent implements OnInit {
  @Input()
  public courseItem: CourseItem | null = null

  constructor() {}

  ngOnInit() {}
}
