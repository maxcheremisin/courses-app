import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-plain-footer',
  template: `
    <footer class="footer">
      <div class="footer__content">
        <span class="footer__text">
          Copyright (C) Video courses, All Rights Reserved.
        </span>
      </div>
    </footer>
  `,
  styleUrls: ['./plain-footer.component.less'],
})
export class PlainFooterComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
