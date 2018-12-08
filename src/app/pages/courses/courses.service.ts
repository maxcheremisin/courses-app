import {Injectable} from '@angular/core'
import {courseList} from 'mocks/course-list.mock'

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  public async getCourses(query?: string) {
    if (!query) {
      return courseList
    }

    return courseList.filter(
      course =>
        course.caption.toLowerCase().includes(query.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(query.toLowerCase())) ||
        (course.authors && course.authors.join().toLowerCase().includes(query.toLowerCase())),
    )
  }
}
