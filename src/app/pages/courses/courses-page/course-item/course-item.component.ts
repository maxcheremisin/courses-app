import {Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from '../../courses.service'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class CourseItemComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public iconType = iconType

  public isFavorite?: boolean

  @Input()
  public courseItem: CourseItem

  @Input()
  public reload: () => void

  public onItemClick: (e: Event, id: number) => void = (e, id) => {
    this.courseService.getCourseById(id).then(course => course && console.log(`on ${course.caption} click`))
  }

  public onRemoveItem = (e: Event) => {
    const confirmation = confirm(`Are you sure you want to delete "${this.courseItem.caption}"?`)

    if (confirmation) {
      this.courseService.removeCourse(this.courseItem).then(() => this.reload())
    }
  }

  public toggleFavorite = (e: Event) => {
    e.stopPropagation()
    this.isFavorite = !this.isFavorite
  }

  ngOnInit() {
    this.isFavorite = this.courseItem.favorite
  }
}
