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
  public coursesList: CourseItem[] = []

  public ngOnInit() {
    this.courseService.didUpdate.subscribe((isUpdated: boolean) => {
      if (isUpdated) {
        this.reload()
      }
    })

    this.reload()
  }

  public reload = (query?: QueryParams, isInfiniteScroll = false) => {
    this.courseService.getCourses(query).then(data => {
      if (isInfiniteScroll) {
        // items caching
        this.coursesList = this.coursesList.concat(data.content)
      } else {
        this.coursesList = data.content
      }

      this.data = data
    })
  }

  public onCourseSearch(searchText: string) {
    this.reload({searchText})
  }
}
