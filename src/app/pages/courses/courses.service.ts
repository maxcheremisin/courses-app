import {Injectable} from '@angular/core'
import {courseList} from 'mocks/course-list.mock'
import {CourseItem} from 'types/course-item.types'

type CourseSearchParams = [CourseItem, string]
type CourseCreateParams = Pick<CourseItem, Exclude<keyof CourseItem, 'id'>>
type CourseUpdateParams = Partial<Pick<CourseItem, Exclude<keyof CourseItem, 'id'>>>

function Read(Superclass = CrudController) {
  return class Class extends Superclass {
    constructor() {
      super()
    }

    private isFoundByCaption(course: CourseItem, query: string) {
      return course.caption.toLowerCase().includes(query.toLowerCase())
    }

    private isFoundByDescription(course: CourseItem, query: string) {
      return course.description && course.description.toLowerCase().includes(query.toLowerCase())
    }

    private isFoundByAuthors(course: CourseItem, query: string) {
      return course.authors && course.authors.join().toLowerCase().includes(query.toLowerCase())
    }

    private isFound(...args: CourseSearchParams) {
      return (
        this.isFoundByCaption(...args) ||
        this.isFoundByDescription(...args) ||
        this.isFoundByAuthors(...args)
      )
    }

    public async getCourses(query?: string) {
      if (!query) {
        return this.courseList
      }

      return this.courseList.filter(course => this.isFound(course, query))
    }


    public async getCourseById(id: number) {
      return this.courseList.find(course => course.id === id)
    }
  }
}

function Delete(Superclass = CrudController) {
  return class Class extends Superclass {
    constructor() {
      super()
    }

    public async removeCourse(course: CourseItem) {
      this.courseList = this.courseList.filter(c => c !== course)
    }
  }
}

function Create(Superclass = CrudController) {
  return class Class extends Superclass {
    constructor() {
      super()
    }

    public createCourse(params: CourseCreateParams) {}
  }
}

function Update(Superclass = CrudController) {
  return class Class extends Superclass {
    constructor() {
      super()
    }

    public updateCourse(params: CourseUpdateParams) {}
  }
}

declare class CrudInterface {
  protected courseList: CourseItem[]
  public createCourse(params: Partial<CourseItem>): void
  public getCourseById(id: number): Promise<CourseItem | undefined>
  public removeCourse(course: CourseItem): Promise<void>
  public updateCourse(params: Partial<CourseItem>): void
  public getCourses(query?: string): Promise<CourseItem[]>
}

const CrudController: new () => CrudInterface = (() => {}) as any

@Injectable({providedIn: 'root'})
export class CoursesService extends Create(Read(Update(Delete())))  {
  constructor() {
    super()
    this.courseList = courseList
  }
}
