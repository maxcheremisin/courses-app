import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {DatePipe} from '@angular/common'
import {ComponentsModule} from 'components/components.module'
import {AppComponent} from './app.component'
import {PagesModule} from './pages/pages.module'
import {RouterModule} from '@angular/router'
import {Routes} from './app.routes'

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, PagesModule, ComponentsModule, RouterModule.forRoot(Routes), HttpClientModule],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
