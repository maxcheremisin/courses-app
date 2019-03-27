import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule} from '@angular/common/http'
import {InjectionToken, NgModule} from '@angular/core'
import {DatePipe} from '@angular/common'
import {ComponentsModule} from 'components/components.module'
import {AppComponent} from './app.component'
import {PagesModule} from './pages/pages.module'
import {RouterModule} from '@angular/router'
import {Routes} from './app.routes'
import {ActionReducerMap, StoreModule} from '@ngrx/store'
import {authReducer} from 'store/reducers/auth.reducer'
import {AppStore, AuthEffects} from 'store/index'
import {EffectsModule} from '@ngrx/effects'

export const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppStore>>('Registered Reducers')

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    PagesModule,
    ComponentsModule,
    RouterModule.forRoot(Routes),
    HttpClientModule,
    StoreModule.forRoot(REDUCER_TOKEN),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [DatePipe, {provide: REDUCER_TOKEN, useFactory: () => ({auth: authReducer})}],
  bootstrap: [AppComponent],
})
export class AppModule {}
