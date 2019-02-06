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
