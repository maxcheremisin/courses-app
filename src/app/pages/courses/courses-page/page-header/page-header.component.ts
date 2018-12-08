import {Component, Input, OnInit} from '@angular/core'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent implements OnInit {
  constructor() {}

  @Input()
  public onSearch: (input: string) => void

  ngOnInit() {}
}
