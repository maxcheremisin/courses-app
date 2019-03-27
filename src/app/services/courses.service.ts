import {EventEmitter, Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {CourseItem, Methods, RequestData, Params, Page, QueryParams, QueryPageParams, Person} from 'types/index'
import {BlockerService} from 'services/blocker.service'

class Api<T> {
  constructor(private http: HttpClient) {}

  private readonly _baseUrl = `${window.location.origin}/api/`

  private routeMap = {
    courses: 'courses',
    course: 'courses/:id',
    authors: 'authors',
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
    return this.generateEndpoints<T, Page<T[]>>(this.routeMap.courses)
  }

  public get course() {
    return this.generateEndpoints<T, T>(this.routeMap.course)
  }

  public getAuthors(text: string) {
    return this.http.get<Person[]>(this._baseUrl + this.routeMap.authors, {params: {searchText: text}})
  }
}

declare class CoursesServiceInterface {
  public didUpdate: EventEmitter<Promise<boolean>>
  public setPageState(state: Partial<QueryPageParams>): void
  public getPageState(): QueryPageParams

  public createCourse(payload: CourseItem): void
  public getCourseById(id: number): Promise<CourseItem | undefined>
  public removeCourse(id: number): Promise<CourseItem>
  public updateCourse(payload: CourseItem): void
  public getCourses(query?: QueryParams): Promise<Page<CourseItem[]>>
}

@Injectable({providedIn: 'root'})
export class CoursesService implements CoursesServiceInterface {
  private static queue = Promise.resolve()

  constructor(private http: HttpClient, private blocker: BlockerService) {
    this.api = new Api(http)

    const pageState = localStorage.getItem('page-state')
    this.pageState = pageState ? JSON.parse(pageState) : {pageSize: '6'}
  }

  private api: Api<CourseItem>

  public didUpdate = new EventEmitter<Promise<boolean>>()

  private pageState: QueryPageParams

  public setPageState(state: Partial<QueryPageParams>) {
    this.pageState = {...this.pageState, ...state}
    localStorage.setItem('page-state', JSON.stringify(this.stateToStorage(this.pageState)))
  }

  public getPageState() {
    return this.pageState
  }

  private stateToStorage(state: QueryPageParams) {
    const {searchText, ...toStorage} = state
    return toStorage
  }

  private activateBlocker() {
    this.blocker.isActivated = true
  }

  private deactivateBlocker() {
    this.blocker.isActivated = false
  }

  protected courseEmitter = (isUpdated = true) => {
    this.didUpdate.emit(CoursesService.queue.then(() => isUpdated))
  }

  public async createCourse(payload: CourseItem) {
    this.activateBlocker()
    await this.api.courses.post({payload})
    this.courseEmitter()
    this.deactivateBlocker()
  }

  public async getCourses(query?: QueryParams, block = true) {
    if (block) {
      this.activateBlocker()
    }

    const response = await this.api.courses.get({query: {...this.pageState, ...query}})

    this.deactivateBlocker()

    return response
  }

  public async getCourseById(id: number) {
    this.activateBlocker()

    const response = await this.api.course.get({params: {id}})

    this.deactivateBlocker()

    return response
  }

  public async updateCourse(payload: CourseItem, doUpdate = true) {
    if (doUpdate) {
      this.activateBlocker()
    }
    await this.api.course.put({params: {id: payload.id}, payload})
    this.courseEmitter(doUpdate)
    this.deactivateBlocker()
  }

  public async removeCourse(id: number) {
    this.activateBlocker()

    const response = await this.api.course.delete({params: {id}})

    this.courseEmitter()
    this.deactivateBlocker()

    return response
  }

  public getAuthors(text: string) {
    return this.api.getAuthors(text)
  }
}
