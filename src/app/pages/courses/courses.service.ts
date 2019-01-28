import {EventEmitter, Injectable} from '@angular/core'
import {courseList} from 'mocks/course-list.mock'
import {CourseItem} from 'types/course-item.types'

type CourseSearchParams = [CourseItem, string]
type CourseCreateParams = Pick<CourseItem, Exclude<keyof CourseItem, 'id'>>
type CourseUpdateParams = Partial<CourseCreateParams>

function Read(Superclass = CrudController) {
  return class Class extends Superclass {
    private isFoundByCaption(course: CourseItem, query: string) {
      return course.caption && course.caption.toLowerCase().includes(query.toLowerCase())
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
    public async removeCourse(course: CourseItem) {
      this.courseList = this.courseList.filter(c => c !== course)
      this.courseEmitter()
    }
  }
}

function Create(Superclass = CrudController) {
  return class Class extends Superclass {
    public async createCourse(params: CourseCreateParams) {
      const course: CourseItem = {
        id: this.courseList.length + 1,
        ...params,
      }
      this.courseList = [...this.courseList, course]
      this.courseEmitter()
    }
  }
}

function Update(Superclass = CrudController) {
  return class Class extends Superclass {
    public async updateCourse(id: number, params: CourseUpdateParams) {
      let course = this.courseList.find(c => c.id === id)
      if (!course) {
        return
      }
      course = {...course, ...params}
      this.courseList = [...this.courseList.filter(c => c.id !== id), {...course}]
      this.courseEmitter()
    }
  }
}

declare class CrudInterface {
  protected courseList: CourseItem[]
  public courseUpdater: EventEmitter<CourseItem[]>
  protected courseEmitter(): void
  public createCourse(params: CourseUpdateParams): Promise<void>
  public getCourseById(id: number): Promise<CourseItem | undefined>
  public removeCourse(course: CourseItem): Promise<void>
  public updateCourse(id: number, params: CourseUpdateParams): Promise<void>
  public getCourses(query?: string): Promise<CourseItem[]>
}

const CrudController: new () => CrudInterface = (() => {}) as any

@Injectable({providedIn: 'root'})
export class CoursesService extends Create(Read(Update(Delete()))) {
  constructor() {
    super()
    this.courseList = courseList
    this.courseUpdater = new EventEmitter()
    this.courseEmitter = () => this.courseUpdater.emit(this.courseList)
  }
}
