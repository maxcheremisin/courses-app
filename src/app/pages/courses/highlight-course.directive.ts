import {Directive, ElementRef, Input, Renderer2} from '@angular/core'

@Directive({selector: '[appHighlightCourse]'})
export class HighlightCourseDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input()
  public set appHighlightCourse(courseDate: string) {
    const creationDate = new Date(courseDate)
    const currentDate = new Date()

    if (creationDate > currentDate) {
      this.renderer.addClass(this.el.nativeElement, 'course-item--upcoming')
    } else if (creationDate < currentDate) {
      currentDate.setDate(currentDate.getDate() - 14)

      if (creationDate >= currentDate) {
        this.renderer.addClass(this.el.nativeElement, 'course-item--fresh')
      }
    }
  }
}
