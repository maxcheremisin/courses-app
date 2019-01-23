import {Component, OnInit} from '@angular/core'
import {CourseItem} from 'types/course-item.types'
import {CoursesService} from '../courses.service'
import {Router} from '@angular/router'
import {AuthService} from '../../../auth.service'

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
})
export class CoursesPageComponent implements OnInit {
  constructor(private courseService: CoursesService, private auth: AuthService, private router: Router) {}

  public courses: CourseItem[] = []

  private reload = (query?: string) => {
    this.courseService.getCourses(query).then(courses => {
      this.courses = courses
    })
  }

  public onCourseSearch(query: string) {
    this.reload(query)
  }

  private redirect = () => this.router.navigateByUrl('login')

  ngOnInit() {
    if (!this.auth.isLoggedIn) {
      this.redirect()
      return
    }

    this.auth.authUpdater.subscribe((isLoggedIn: boolean) => !isLoggedIn && this.redirect())
    this.reload()
  }
}
