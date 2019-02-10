import {Component, Input, OnChanges, ViewChild, ViewEncapsulation} from '@angular/core'
import {CourseItem, Page, QueryParams} from 'types/index'
import {PaginationComponent} from 'components/pagination/pagination.component'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-paginating.component.less'],
  templateUrl: './courses-paginating.component.html',
})
export class CoursesPaginatingComponent implements OnChanges {
  @Input()
  public data: Page<CourseItem[]>

  @Input()
  public reload: (query?: QueryParams, isInfiniteScroll?: boolean) => void

  @Input()
  public coursesList: CourseItem[] = []

  public totalItems = 0

  public onLoadPage = (page: number, isInfiniteScroll = false) => this.reload({page: String(page)}, isInfiniteScroll)

  ngOnChanges() {
    if (this.data) {
      this.data.content = this.coursesList // items caching
      this.totalItems = this.data.totalCount
    }
  }
}
