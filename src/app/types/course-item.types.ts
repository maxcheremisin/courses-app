export interface CourseItem {
  id: number
  caption: string
  duration?: number
  description?: string
  authors?: string[]
  date?: Date | string
  favorite?: boolean
}
