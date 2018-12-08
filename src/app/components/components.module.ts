import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LabelComponent} from './label/label.component'
import {PlainFooterComponent} from './plain-footer/plain-footer.component'
import {HeaderComponent} from './header/header.component'
import {LogoComponent} from './logo/logo.component'
import {RouterModule} from '@angular/router'

@NgModule({
  declarations: [LabelComponent, PlainFooterComponent, HeaderComponent, LogoComponent],
  imports: [CommonModule, RouterModule],
  exports: [LabelComponent, PlainFooterComponent, HeaderComponent, LogoComponent],
})
export class ComponentsModule {}
