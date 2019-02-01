import {Component, OnInit, Input, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from '../../courses.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseItemComponent implements OnInit {
  constructor(private courseService: CoursesService, private router: Router) {}

  public iconType = iconType

  @Input()
  public courseItem: CourseItem

  public onItemClick: (e: Event, id: number) => void = (e, id) => {
    this.courseService.getCourseById(id).then(course => course && console.log(`on ${course.caption} click`))
  }

  public onRemoveItem = (e: Event) => {
    const confirmation = confirm(`Are you sure you want to delete "${this.courseItem.caption}"?`)

    if (confirmation) {
      this.courseService.removeCourse(this.courseItem)
    }
  }

  public toggleFavorite = (e: Event) => {
    e.stopPropagation()
    this.courseService.updateCourse(this.courseItem.id, {favorite: !this.courseItem.favorite})
  }

  public openModal = () => {
    this.router.navigate([{outlets: {modal: `course/${this.courseItem.id}`}}])
  }

  ngOnInit() {}
}
