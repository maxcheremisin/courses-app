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

  public iconType = iconType

  public onSearchHandler(input: string) {
    this.onSearch.emit(input)
  }

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit() {}
}
