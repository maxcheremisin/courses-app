import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {iconType} from 'components/icon/icon-type.enum'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseItemComponent implements OnInit {
  public iconType = iconType

  public isFavorite?: boolean

  @Input()
  public courseItem: CourseItem

  @Input()
  public onItemClick: (e: Event, caption?: string) => void = (e, caption) => {
    console.log(`on ${caption} click`)
  }

  public toggleFavorite = (e: Event) => {
    e.stopPropagation()
    this.isFavorite = !this.isFavorite
  }

  ngOnInit() {
    this.isFavorite = this.courseItem.favorite
  }
}
