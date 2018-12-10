import {Component, EventEmitter, OnInit, Output} from '@angular/core'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent implements OnInit {
  constructor() {}

  public onSearchHandler(input: string) {
    this.onSearch.emit(input)
  }

  @Output()
  public onSearch: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit() {}
}
