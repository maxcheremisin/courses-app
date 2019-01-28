import {Component, EventEmitter, Output, ViewEncapsulation} from '@angular/core'
import {Router} from '@angular/router'
import {iconType} from 'components/icon/icon-type.enum'
import {CoursesService} from '../../courses.service'

@Component({
  selector: 'app-page-header',
  styleUrls: ['page-header.component.less'],
  templateUrl: './page-header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PageHeaderComponent {
  constructor(private coursesService: CoursesService, private router: Router) {}

  @Output()
  public search = new EventEmitter<string>()

  public iconType = iconType

  public onSearchHandler(input: string) {
    this.search.emit(input)
  }

  public openModal = () => {
    this.router.navigate([{outlets: {modal: 'add-course'}}])
  }
}
