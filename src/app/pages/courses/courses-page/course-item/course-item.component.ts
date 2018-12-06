import {Component, OnInit, Input} from '@angular/core'
import {CourseItem} from 'types/course-item.types'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less'],
})
export class CourseItemComponent implements OnInit {
  @Input()
  public courseItem: CourseItem

  @Input()
  public onItemClick: (e: Event, caption?: string) => void = (e, caption) => {
    console.log(`on ${caption} click`)
  }

  constructor() {}

  ngOnInit() {}
}
