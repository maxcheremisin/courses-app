import {Component, OnInit} from '@angular/core'
import {CoursesService} from 'services/courses.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.less'],
})
export class CoursePageComponent implements OnInit {
  constructor(private coursesService: CoursesService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params.id
    })
  }

  public id: number

  public courseStub: string

  ngOnInit() {
    this.coursesService.getCourseById(this.id).then(course => {
      this.courseStub = JSON.stringify(course)
    })
  }
}
