import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {ComponentsModule} from 'components/components.module'
import {AppComponent} from './app.component'
import {PagesModule} from './pages/pages.module'
import {RouterModule} from '@angular/router'
import {Routes} from './app.routes'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PagesModule, ComponentsModule, RouterModule.forRoot(Routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
