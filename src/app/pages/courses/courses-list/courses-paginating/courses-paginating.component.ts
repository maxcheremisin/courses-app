import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core'
import {CourseItem, Page, QueryParams} from 'types/index'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-paginating.component.less'],
  templateUrl: './courses-paginating.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CoursesPaginatingComponent implements OnChanges {
  constructor() {}

  @Input()
  public data: Page<CourseItem[]>

  @Input()
  public reload: (query?: QueryParams) => void

  public coursesList: CourseItem[] = []
  public totalItems = 0

  public onLoadMore = () => {
    this.reload({
      fromPage: String(0),
      page: String(++this.data.page),
    })
  }

  ngOnChanges() {
    if (this.data) {
      this.coursesList = this.data.content
      this.totalItems = this.data.totalCount
    }
  }
}
