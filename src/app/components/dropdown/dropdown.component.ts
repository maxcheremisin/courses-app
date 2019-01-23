import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent implements OnInit {
  constructor() {}

  public iconType = iconType

  ngOnInit() {}
}
