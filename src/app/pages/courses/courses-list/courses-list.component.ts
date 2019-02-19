import {Component, OnInit} from '@angular/core'
import {CourseItem, Page, QueryParams} from 'types/index'
import {CoursesService} from 'services/courses.service'
import {Subject, interval} from 'rxjs'
import {debounce} from 'rxjs/operators'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-list.component.html',
})
export class CoursesListComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  public data: Page<CourseItem[]>

  public coursesList: CourseItem[] = []

  public search = new Subject<string>()

  public ngOnInit() {
    this.courseService.didUpdate.subscribe((update: Promise<boolean>) => update.then(isUpdated => isUpdated && this.reload()))

    this.search
      .asObservable()
      .pipe(debounce(() => interval(500)))
      .subscribe(searchText => {
        this.courseService.setPageState({searchText})
        this.reload({block: false})
      })

    this.reload()
  }

  public reload = ({
    query,
    isInfiniteScroll = false,
    block = true,
  }: {
    query?: QueryParams
    isInfiniteScroll?: boolean
    block?: boolean
  } = {}) => {
    this.courseService.getCourses(query, block).then(data => {
      if (isInfiniteScroll) {
        // items caching
        this.coursesList = this.coursesList.concat(data.content)
      } else {
        this.coursesList = data.content
      }

      this.data = data
    })
  }
}
