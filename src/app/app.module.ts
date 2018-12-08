import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {ComponentsModule} from 'components/components.module'
import {AppComponent} from './app.component'
import {PagesModule} from './pages/pages.module'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PagesModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
