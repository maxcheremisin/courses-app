import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LabelComponent} from './label/label.component'
import {PlainFooterComponent} from './plain-footer/plain-footer.component'
import {HeaderComponent} from './header/header.component'
import {LogoComponent} from './logo/logo.component'
import {RouterModule} from '@angular/router';
import { IconComponent } from './icon/icon.component'

@NgModule({
  declarations: [LabelComponent, PlainFooterComponent, HeaderComponent, LogoComponent, IconComponent],
  imports: [CommonModule, RouterModule],
  exports: [LabelComponent, PlainFooterComponent, HeaderComponent, LogoComponent, IconComponent],
})
export class ComponentsModule {}
