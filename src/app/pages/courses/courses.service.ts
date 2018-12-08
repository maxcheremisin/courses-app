import {Injectable} from '@angular/core'
import {courseList} from 'mocks/course-list.mock'

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor() {}

  public async getCourses() {
    return courseList
  }
}
