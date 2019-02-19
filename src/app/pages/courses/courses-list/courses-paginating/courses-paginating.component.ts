import {Component, Input, OnChanges, ViewChild, ViewEncapsulation} from '@angular/core'
import {CourseItem, Option, Page, QueryParams} from 'types/index'
import {PaginationComponent} from 'components/pagination/pagination.component'
import {CoursesService} from 'services/courses.service'

@Component({
  selector: 'app-courses-list',
  styleUrls: ['courses-paginating.component.less'],
  templateUrl: './courses-paginating.component.html',
})
export class CoursesPaginatingComponent implements OnChanges {
  constructor(private courseService: CoursesService) {
    this.initPageSizeOptions()
  }

  @Input()
  public data: Page<CourseItem[]>

  @Input()
  public reload: ({}?: {query?: QueryParams, isInfiniteScroll?: boolean}) => void

  @Input()
  public coursesList: CourseItem[] = []

  public totalItems = 0

  public pageSizeOptions: Option[] = []

  public onLoadPage = (page: number, isInfiniteScroll = false) => this.reload({query: {page: String(page)}, isInfiniteScroll})

  public onPageSizeChange = (value: Option['value']) => {
    this.courseService.setPageState({pageSize: String(value)})
    this.reload()
  }

  private initPageSizeOptions() {
    const {pageSize} = this.courseService.getPageState()

    this.pageSizeOptions = [
      {name: '6', value: 6},
      {name: '12', value: 12},
      {name: '24', value: 24}
    ].map(o => (o.value.toString() === pageSize ? {...o, selected: true} : o))
  }

  ngOnChanges() {
    if (this.data) {
      this.data.content = this.coursesList // items caching
      this.totalItems = this.data.totalCount
    }
  }
}
