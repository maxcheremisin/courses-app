import {Component, Input, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from 'services/courses.service'
import {Subject} from 'rxjs'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent {
  constructor(private coursesService: CoursesService, private router: Router) {}

  @Input()
  private search: Subject<string>

  public iconType = iconType

  public onSearchHandler = (e: KeyboardEvent) => {
    const searchText = (e.target as HTMLInputElement).value
    this.search.next(searchText)
  }

  public openModal = () => {
    this.router.navigate([{outlets: {modal: 'course-edit/new'}}])
  }
}
