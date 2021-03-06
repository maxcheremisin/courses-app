import {Component, Input, ViewEncapsulation, ChangeDetectionStrategy, OnInit} from '@angular/core'
import {CourseItem} from 'types/index'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from 'services/courses.service'
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

  public isTopRated = false

  public getLink() {
    return `course/${this.courseItem.id}`
  }

  public onRemoveItem = (e: Event) => {
    const confirmation = confirm(`Are you sure you want to delete "${this.courseItem.caption}"?`)

    if (confirmation) {
      this.courseService.removeCourse(this.courseItem.id)
    }
  }

  public getAuthors() {
    return this.courseItem.authors ? this.courseItem.authors.map(a => a.name).join(', ') : '-'
  }

  public toggleFavorite = (e: Event) => {
    e.stopPropagation()
    this.isTopRated = !this.isTopRated
    this.courseService.updateCourse({...this.courseItem, isTopRated: this.isTopRated}, false)
  }

  public openModal = () => {
    this.router.navigate([{outlets: {modal: `course-edit/${this.courseItem.id}`}}])
  }

  ngOnInit() {
    this.isTopRated = !!this.courseItem.isTopRated
  }
}
