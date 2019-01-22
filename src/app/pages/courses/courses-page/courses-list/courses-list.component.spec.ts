import {TestBed, ComponentFixture} from '@angular/core/testing'
import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesListComponent} from './courses-list.component'

const coursesListMock: CourseItem[] = [
  {
    id: 1,
    caption: 'Test Item 1',
    authors: ['Author One', 'Author Two'],
    date: '2018-12-12',
    duration: 99,
    description: 'testing text',
  },
  {
    id: 2,
    caption: 'Test Item 2',
    authors: ['Author One', 'Author Two'],
    date: '2018-12-12',
    duration: 99,
    description: 'testing text',
  },
]

@Component({
  template: `<app-courses-list [coursesList]="coursesList"></app-courses-list>`,
})
class TestHostComponent {
  public coursesList: CourseItem[] = coursesListMock
}

describe('CoursesListComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>
  let component: TestHostComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesListComponent, TestHostComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.debugElement.componentInstance
  })

  it('should have list of course items', () => {
    expect(component.coursesList).toEqual(coursesListMock)
  })

  it('should have correct total label', () => {
    fixture.detectChanges()

    const element = fixture.debugElement.nativeElement.querySelector('.courses-list__total')
    expect(element.textContent).toContain(`There are ${coursesListMock.length} courses`)
  })

  it('should render all items', () => {
    fixture.detectChanges()

    const elements = fixture.debugElement.nativeElement.querySelectorAll('app-course-item')
    expect(elements.length).toEqual(coursesListMock.length)
  })
})
