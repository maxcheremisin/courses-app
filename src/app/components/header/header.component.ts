import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {AuthService} from '../../auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  constructor(public auth: AuthService) {}

  public onLogOut = () => {
    this.auth.logOut()
  }

  ngOnInit() {}
}
