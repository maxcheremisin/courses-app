import {TestBed, ComponentFixture, ComponentFixtureAutoDetect, async} from '@angular/core/testing'
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesPageComponent} from './courses-page.component'
import {CoursesService} from '../courses.service'

const coursesMock: CourseItem[] = [
  {
    caption: 'Test',
    authors: ['Author One', 'Author Two'],
    date: '2018-12-12',
    duration: 99,
    description: 'testing text',
  },
  {
    caption: 'Test 2',
    authors: ['Author One', 'Author Two'],
    date: '2018-12-12',
    duration: 99,
    description: 'testing text',
  },
]

describe('CoursesPageComponent', () => {
  let fixture: ComponentFixture<CoursesPageComponent>
  let component: CoursesPageComponent
  let courseService: CoursesService

  beforeEach(() => {
    courseService = {
      async getCourses(query) {
        return query ? coursesMock.filter(c => c.caption === query) : coursesMock
      },
    }

    TestBed.configureTestingModule({
      declarations: [CoursesPageComponent],
      providers: [{provide: ComponentFixtureAutoDetect, useValue: true}, {provide: CoursesService, useValue: courseService}],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent)
    component = fixture.debugElement.componentInstance
  })

  it('should not have courses', () => {
    expect(component.courses).toEqual([])
  })

  it('should get list of courses', async(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges()

      expect(component.courses.length).toBeGreaterThan(0)
    })
  }))

  it('should get list of courses by search query', async(() => {
    component.onCourseSearch('Test')

    fixture.whenStable().then(() => {
      fixture.detectChanges()

      expect(component.courses.length).toBe(1)
    })
  }))
})
