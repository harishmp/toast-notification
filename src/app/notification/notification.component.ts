import { Component, OnInit } from '@angular/core';
import { cloneDeep, random } from 'lodash-es';

import { GlobalConfig, ToastrService } from '../../lib/public_api';

interface Quote {
  title?: string;
  subheading?: string;
  message?: string;
  type?: string;
}

const quotes: Quote[] = [
  {
    type: 'error',
    title: 'Error!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  },
  {
    type: 'success',
    title: 'Success!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  },
  {
    type: 'error',
    title: 'Error!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  },
  {
    type: 'warning',
    title: 'Warning!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  },
  {
    type: 'success',
    title: 'Success!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  },
  {
    type: 'warning',
    title: 'Warning!!!',
    subheading: 'subheading!!!',
    message: 'Message ....',
  }
];

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  options: GlobalConfig;
  title = '';
  message = '';
  type = '';
  private lastInserted: number[] = [];

  constructor(public toastr: ToastrService) {
    this.options = this.toastr.toastrConfig;
   }

  getMessage() {
    this.options.maxOpened = 4;
    this.options.timeOut = 5000;
    this.options.positionClass = 'toast-bottom-right';
    let m: string | undefined = this.message;
    let h: string | undefined = this.title;
    let t: string | undefined = this.type;
    if (!this.title.length && !this.message.length) {
      const randomMessage = quotes[random(0, quotes.length - 1)];
      m = randomMessage.message;
      h = randomMessage.title;
      t = randomMessage.type;
    }
    return {
      message: m,
      title: h,
      type: t,
    };
  }
  openToast() {
    const { message, title, type } = this.getMessage();
    // Clone current config so it doesn't change when ngModel updates
    const opt = cloneDeep(this.options);
    const inserted = this.toastr.show(
      message,
      title,
      opt,
      this.options.iconClasses[type],
    );
    if (inserted) {
      this.lastInserted.push(inserted.toastId);
    }
    return inserted;
  }
  clearToasts() {
    this.toastr.clear();
  }
  clearLastToast() {
    this.toastr.clear(this.lastInserted.pop());
  }
  fixNumber(field: keyof GlobalConfig): void {
    (this.options as any)[field] = Number(this.options[field]) as any;
  }

  ngOnInit() {
  }

}
