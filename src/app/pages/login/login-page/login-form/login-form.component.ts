import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  @Output()
  public submit: EventEmitter<{}> = new EventEmitter<{}>()

  private email = ''
  private password = ''

  public handleInput = (type: 'email' | 'password') => (value: string) => {
    this[type] = value
  }

  public onSubmit = (e: KeyboardEvent) => {
    if (e && e.code === 'Enter' || e.type === 'click') {
      this.submit.emit({email: this.email, password: this.password})
    }
  }

  ngOnInit() {}
}
