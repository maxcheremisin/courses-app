import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {LabelComponent} from './label/label.component'
import {PlainFooterComponent} from './plain-footer/plain-footer.component'
import {HeaderComponent} from './header/header.component'
import {LogoComponent} from './logo/logo.component'
import {RouterModule} from '@angular/router'
import {IconComponent} from './icon/icon.component'
import {ButtonComponent} from './button/button.component'
import {DropdownComponent} from './dropdown/dropdown.component'
import {ModalComponent} from './modal/modal.component'
import {InputComponent} from './input/input.component'
import {LoaderComponent} from './loader/loader.component'
import {FormsModule} from '@angular/forms'

@NgModule({
  declarations: [
    LabelComponent,
    PlainFooterComponent,
    HeaderComponent,
    LogoComponent,
    IconComponent,
    ButtonComponent,
    DropdownComponent,
    ModalComponent,
    InputComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    LabelComponent,
    PlainFooterComponent,
    HeaderComponent,
    LogoComponent,
    IconComponent,
    ButtonComponent,
    ModalComponent,
    InputComponent,
    LoaderComponent,
  ],
})
export class ComponentsModule {}
