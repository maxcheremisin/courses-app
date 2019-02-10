import {Component, ElementRef, Input, OnInit, ViewEncapsulation, Output, EventEmitter, OnDestroy} from '@angular/core'
import {iconType} from 'components/icon/icon-type.enum'
import {Router} from '@angular/router'

@Component({
  selector: 'app-modal',
  styleUrls: ['./modal.component.less'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="modal">
      <div class="modal__window">
        <div class="modal__header">
          <h1>{{header}}</h1>
          <app-icon [onClick]="close" [type]="iconType.Close" className="modal__icon"></app-icon>
        </div>
        <div class="modal__content">
          <ng-content></ng-content>
        </div>
        <div class="modal__footer">
          <div class="modal__info">
            {{info}}
          </div>
          <div class="modal__control">
            <app-button className="modal__button" [onClick]="close" text="Cancel" [settings]="{textColor: 'grey'}"></app-button>
            <app-button
              *ngIf="submit"
              className="modal__button"
              [settings]="{bgColor: 'green'}"
              [onClick]="onSubmit"
              text="Save"
            ></app-button>
          </div>
        </div>
      </div>
      <div class="modal__background"></div>
    </div>
  `,
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private el: ElementRef<HTMLDivElement>) {
    this.element = el.nativeElement
  }

  readonly element: HTMLDivElement

  public iconType = iconType

  @Input()
  public header: string
  @Input()
  public info: string
  @Output()
  public submit = new EventEmitter()

  @Output()
  public modalClose = new EventEmitter<Event>()

  public ngOnInit() {
    document.body.classList.add('modal-open')

    this.element.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLDivElement).className === 'modal__background') {
        this.close(e)
      }
    })
  }

  public ngOnDestroy() {
    document.body.classList.remove('modal-open')
  }

  public onSubmit = (e: Event) => {
    this.submit.emit(e)
    this.close(e)
  }

  public close = (e: Event) => {
    this.router.navigate([{outlets: {modal: null}}])
    this.modalClose.next(e)
  }
}
