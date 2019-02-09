import {Component, OnInit} from '@angular/core'
import {CourseItem, Page, QueryParams} from 'types/index'
import {CoursesService} from 'services/courses.service'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public data: Page<CourseItem[]>

  public ngOnInit() {
    this.courseService.didUpdate.subscribe(() => {
      this.reload()
    })

    this.reload()
  }

  public reload = (query?: QueryParams) => {
    this.courseService.getCourses(query).then(data => {
      this.data = data
    })
  }

  public onCourseSearch(searchText: string) {
    this.reload({searchText})
  }
}
