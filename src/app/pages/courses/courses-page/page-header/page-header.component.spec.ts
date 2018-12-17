import {TestBed, ComponentFixture, ComponentFixtureAutoDetect} from '@angular/core/testing'
import {CommonModule} from '@angular/common'
import {By} from '@angular/platform-browser'
import {ComponentsModule} from 'components/components.module'
import {PageHeaderComponent} from './page-header.component'

describe('PageHeaderComponent', () => {
  let fixture: ComponentFixture<PageHeaderComponent>
  let component: PageHeaderComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
      imports: [CommonModule, ComponentsModule],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}],
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderComponent)
    component = fixture.debugElement.componentInstance
    component.onSearchHandler = jasmine.createSpy('onSearchHandler')
  })

  it('should create page header', () => {
    expect(component).toBeDefined()
  })

  it('should show empty input field', () => {
    const element: HTMLInputElement = fixture.debugElement.nativeElement.querySelector('.page-header__control__search-input')

    expect(element.value).toBe('')
  })

  it('should react on input change', () => {
    const element = fixture.debugElement.query(By.css('.page-header__control__search-input'))

    element.triggerEventHandler('input', {target: {value: 'test value'}})
    expect(component.onSearchHandler).toHaveBeenCalledWith('test value')
  })

  it('raises the input value', () => {
    component.onSearchHandler('test value')
    component.onSearch.subscribe((input: string) => expect(input).toBe('test value'))
  })
})
