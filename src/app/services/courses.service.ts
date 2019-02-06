import {EventEmitter, Injectable} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

type CourseSearchParams = [CourseItem, string]
type CourseCreateParams = Pick<CourseItem, Exclude<keyof CourseItem, 'id'>>
type CourseUpdateParams = Partial<CourseCreateParams>

interface Params {
  [p: string]: string | number
}

class Api<T> {
  constructor(private http: HttpClient) {}

  private readonly _baseUrl = `${window.location.origin}/api/`

  private urlMap = {
    courses: 'courses',
    course: 'courses/:id',
  }

  private resolveUrl(url: string, params: Params = {}) {
    if (!url) {
      console.error('Not url')
    } else {
      url = this._baseUrl.concat(url)
    }

    const replacer = (resultUrl: string, key: string) => resultUrl.replace(`:${key}`, `${params[key]}`)

    return Object.keys(params).reduce(replacer, url)
  }

  public courses() {
    const url = this.resolveUrl(this.urlMap.courses)
    return this.http.get<T[]>(url)
  }

  public course(params: Params) {
    const url = this.resolveUrl(this.urlMap.course, params)
    return this.http.get<T>(url)
  }
}

declare class CoursesServiceInterface {
  public courseUpdater: EventEmitter<CourseItem[]>
  public createCourse(params: CourseUpdateParams): Promise<void>
  public getCourseById(id: number): Observable<CourseItem | undefined>
  public removeCourse(course: CourseItem): Promise<void>
  public updateCourse(id: number, params: CourseUpdateParams): Promise<void>
  public getCourses(query?: string): Observable<CourseItem[]>
}

@Injectable({providedIn: 'root'})
export class CoursesService implements CoursesServiceInterface {
  constructor(private http: HttpClient) {
    this.api = new Api(http)
  }

  private api: Api<CourseItem>
  public courseUpdater = new EventEmitter<CourseItem[]>()
  // protected courseEmitter = () => this.courseUpdater.emit(this.courseList)

  public async createCourse(params: CourseCreateParams) {
    // const course: CourseItem = {
    //   id: this.courseList.length + 1,
    //   ...params,
    // }
    // this.courseList = [...this.courseList, course]
    // this.courseEmitter()
  }

  public getCourses(searchText?: string) {
    // function isFoundByCaption(course: CourseItem, query: string) {
    //   return course.caption && course.caption.toLowerCase().includes(query.toLowerCase())
    // }
    //
    // function isFoundByDescription(course: CourseItem, query: string) {
    //   return course.description && course.description.toLowerCase().includes(query.toLowerCase())
    // }
    //
    // function isFoundByAuthors(course: CourseItem, query: string) {
    //   return (
    //     course.authors &&
    //     course.authors
    //       .join()
    //       .toLowerCase()
    //       .includes(query.toLowerCase())
    //   )
    // }
    //
    // function isFound(...args: CourseSearchParams) {
    //   return isFoundByCaption(...args) || isFoundByDescription(...args) || isFoundByAuthors(...args)
    // }

    // if (!searchText) {
    //   return this.courseList
    // }

    // return this.courseList.filter(course => isFound(course, searchText))
    return this.api.courses()
  }

  public getCourseById(id: number) {
    return this.api.course({id})
  }

  public async updateCourse(id: number, params: CourseUpdateParams) {
    // let course = this.courseList.find(c => c.id === id)
    // if (!course) {
    //   return
    // }
    // course = {...course, ...params}
    // this.courseList = [...this.courseList.filter(c => c.id !== id), {...course}]
    // this.courseEmitter()
  }

  public async removeCourse(course: CourseItem) {
    // this.courseList = this.courseList.filter(c => c !== course)
    // this.courseEmitter()
  }
}
