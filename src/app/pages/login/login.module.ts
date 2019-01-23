import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LoginPageComponent} from './login-page/login-page.component'
import {LoginFormComponent} from './login-page/login-form/login-form.component'
import {ComponentsModule} from 'components/components.module'

@NgModule({
  declarations: [LoginPageComponent, LoginFormComponent],
  imports: [CommonModule, ComponentsModule],
})
export class LoginModule {}
