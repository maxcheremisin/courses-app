import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {UtilsService} from 'utils/utils.service'
import {iconType} from 'components/icon/icon-type.enum'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseItemComponent implements OnInit {
  public iconType = iconType

  @Input()
  public courseItem: CourseItem

  @Input()
  public onItemClick: (e: Event, caption?: string) => void = (e, caption) => {
    console.log(`on ${caption} click`)
  }

  constructor(private utils: UtilsService) {}

  ngOnInit() {}
}
