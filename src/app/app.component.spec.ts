import {TestBed, async, ComponentFixture} from '@angular/core/testing'
import {AppComponent} from './app.component'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let app: AppComponent

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent)
    app = fixture.debugElement.componentInstance
  })

  it('should create the app', () => {
    expect(app).toBeTruthy()
  })
})
