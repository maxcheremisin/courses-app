import {EventEmitter, Injectable} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {HttpClient} from '@angular/common/http'

interface Params {
  [p: string]: string | number
}

interface QueryParams {
  [p: string]: string | string[]
}

interface RequestData<Req> {
  params?: Params
  query?: QueryParams
  payload?: Req
}

enum Methods {
  Post,
  Get,
  Put,
  Delete,
}

class Api<T> {
  constructor(private http: HttpClient) {}

  private readonly _baseUrl = `${window.location.origin}/api/`

  private routeMap = {
    courses: 'courses',
    course: 'courses/:id',
  }

  private buildRequest = <Req, Res>(route: string, requestMethod: Methods, {params, query, payload}: RequestData<Req> = {}) => {
    const url = this.resolveUrl(route, params)

    switch (requestMethod) {
      case Methods.Post:
        return this.http.post<Res>(url, payload)
      case Methods.Get:
        return this.http.get<Res>(url, {params: query})
      case Methods.Put:
        return this.http.put<Res>(url, payload)
      case Methods.Delete:
        return this.http.delete<Res>(url)
    }
  }

  private generateEndpoints<Req, Res = void>(route: string) {
    const request = <Request, Response>(requestMethod: Methods) => (data?: RequestData<Request>) =>
      this.buildRequest<Request, Response>(route, requestMethod, data).toPromise()

    return {
      post: request<Req, Res>(Methods.Post),
      get: request<Req, Res>(Methods.Get),
      put: request<Req, Res>(Methods.Put),
      delete: request<Req, Res>(Methods.Delete),
    }
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

  public get courses() {
    return this.generateEndpoints<T, T[]>(this.routeMap.courses)
  }

  public get course() {
    return this.generateEndpoints<T, T>(this.routeMap.course)
  }
}

declare class CoursesServiceInterface {
  public didUpdate: EventEmitter<true>
  public createCourse(payload: CourseItem): void
  public getCourseById(id: number): Promise<CourseItem | undefined>
  public removeCourse(id: number): Promise<CourseItem>
  public updateCourse(payload: CourseItem): void
  public getCourses(query?: string): Promise<CourseItem[]>
}

@Injectable({providedIn: 'root'})
export class CoursesService implements CoursesServiceInterface {
  constructor(private http: HttpClient) {
    this.api = new Api(http)
  }

  private api: Api<CourseItem>

  public didUpdate = new EventEmitter<true>()

  protected courseEmitter = <T>(res: T): T => (this.didUpdate.emit(true), res)

  public createCourse(payload: CourseItem) {
    this.api.courses.post({payload}).then(this.courseEmitter)
  }

  public getCourses(searchText?: string) {
    if (!searchText) {
      return this.api.courses.get()
    }
    return this.api.courses.get({query: {searchText}})
  }

  public getCourseById(id: number) {
    return this.api.course.get({params: {id}})
  }

  public updateCourse(payload: CourseItem) {
    this.api.course.put({params: {id: payload.id}, payload}).then(this.courseEmitter)
  }

  public removeCourse(id: number) {
    return this.api.course.delete({params: {id}}).then(this.courseEmitter)
  }
}
