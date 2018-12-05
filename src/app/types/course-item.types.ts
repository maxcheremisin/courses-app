interface Author {
  name: string
}

export interface CourseItem {
  caption: string
  duration?: number
  description?: string
  authors?: Author[]
  date?: Date
}
