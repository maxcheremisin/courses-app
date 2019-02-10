import {Component, Input, OnChanges, ViewEncapsulation} from '@angular/core'
import {Page} from 'types/index'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class PaginationComponent<T> implements OnChanges {
  public pages: number[] = []

  @Input()
  public data: Page<T>

  @Input()
  public load: (page: number, isInfiniteScroll?: boolean) => void

  public isPageButtonVisible(page: number) {
    return Math.abs(this.data.page - page) < 3
  }

  ngOnChanges() {
    this.pages = [...Array(this.data.totalPages).keys()]
  }
}
