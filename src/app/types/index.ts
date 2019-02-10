interface Person {
  id: number
  name: string
}

export interface CourseItem {
  id: number
  caption: string
  duration?: number
  description?: string
  authors?: Person[]
  date?: Date | string
  isTopRated?: boolean
}

export interface Params {
  [p: string]: string | number
}

export interface QueryParams {
  [p: string]: string | string[]
}

export interface RequestData<Req> {
  params?: Params
  query?: QueryParams
  payload?: Req
}

export interface Page<T> {
  content: T,
  totalCount: number,
  pageSize: number,
  page: number,
  fromPage: number,
  totalPages: number,
}

export enum Methods {
  Post,
  Get,
  Put,
  Delete,
}
