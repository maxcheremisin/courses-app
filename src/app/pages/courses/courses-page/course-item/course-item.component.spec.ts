import {TestBed, ComponentFixture} from '@angular/core/testing'
import {Component} from '@angular/core'
import {CommonModule} from '@angular/common'
import {By} from '@angular/platform-browser'
import {CourseItem} from 'types/course-item.types'
import {ComponentsModule} from 'components/components.module'
import {UtilsService} from 'utils/utils.service'
import {CourseItemComponent} from './course-item.component'

const courseItemMock: CourseItem = {
  caption: 'Test Item',
  authors: ['Author One', 'Author Two'],
  date: '2018-12-12',
  duration: 99,
  description: 'testing text',
}
@Component({
  template: `<app-course-item [courseItem]="courseItem" [onItemClick]="onItemClick"></app-course-item>`,
})
class TestHostComponent {
  public courseItem: CourseItem
  public onItemClick = jasmine.createSpy('onItemClick')
}

describe('CourseItemComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let component: TestHostComponent
  let utils: UtilsService

  beforeEach(() => {
    utils = {parseDate: jasmine.createSpy('parseDate')}

    TestBed.configureTestingModule({
      declarations: [CourseItemComponent, TestHostComponent],
      imports: [CommonModule, ComponentsModule],
      providers: [{provide: UtilsService, useValue: utils}],
    })
  })

  it('should not have course item', () => {
    expect(component.courseItem).toBeUndefined()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.debugElement.componentInstance
  })

  it('should render component correctly', () => {
    component.courseItem = courseItemMock
    fixture.detectChanges()
    expect(component).toBeTruthy()
  })

  it('should have right data in the markup', () => {
    component.courseItem = courseItemMock
    fixture.detectChanges()

    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('.course-item__caption').textContent).toContain(courseItemMock.caption)
    expect(compiled.querySelector('.course-item__description').textContent).toContain(courseItemMock.description)
  })

  it('should call utils service method', () => {
    component.courseItem = courseItemMock
    fixture.detectChanges()

    expect(utils.parseDate).toHaveBeenCalled()
  })

  it('should call item handler', () => {
    component.courseItem = courseItemMock
    fixture.detectChanges()

    const element = fixture.debugElement.query(By.css('.course-item'))
    element.triggerEventHandler('click', null)
    expect(component.onItemClick).toHaveBeenCalled()
  })
})
