import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent implements OnInit {
  constructor() {}

  @Output()
  public search: EventEmitter<string> = new EventEmitter<string>()

  public iconType = iconType

  public onSearchHandler(input: string) {
    this.search.emit(input)
  }

  ngOnInit() {}
}
