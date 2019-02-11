import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from 'services/courses.service'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent {
  constructor(private coursesService: CoursesService, private router: Router) {}

  @Output()
  public search = new EventEmitter<KeyboardEvent>()

  public iconType = iconType

  public onSearchHandler = (e: KeyboardEvent) => {
    this.search.emit(e)
  }

  public openModal = () => {
    this.router.navigate([{outlets: {modal: 'course-edit/new'}}])
  }
}
