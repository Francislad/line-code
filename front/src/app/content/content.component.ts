import {Component, OnInit} from '@angular/core';

import {messageSender} from '../../../../back/app/services/request.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  barPadding = 0;
  roundEdges = false;
  showGridLines = true;
  showYAxis = true;

  view;
  maxViewWidth;
  minViewWidth;

  formClasses = {
    ip: '',
    message: ''
  };
  spaceds = {
    binarySpaced: false,
    hexSpaced: false,
    signalSpaced: false
  };

  messageObject = {
    message: '',
    binary: '',
    binarySpaced: '',
    hex: '',
    hexSpaced: '',
    encodedMessage: '',
    encodedSpacedMessage: '',
    encodedSignal: [],
    viewWidth: 0,
    done: false
  };

  colorScheme = {
    domain: ['#4b3ff5']
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(event): void {
    console.log(event);
  }

  sendMessage(): void {
    const {message} = this.messageObject;
    if (!message) {
      this.formClasses.message = !!message ? '' : 'invalid';
      return;
    }

    this.formClasses.message = '';

    messageSender(message).then(res => {
      console.log(res);
      this.messageObject = res;
      this.view = [this.messageObject.viewWidth, 300];
      this.minViewWidth = this.messageObject.viewWidth;
      this.maxViewWidth = this.messageObject.viewWidth * 4;
    });
  }

  lessZoom(): void {
    const width = this.view[0] - 350;
    const height = this.view[1];
    this.view = [width < this.minViewWidth ? this.minViewWidth : width, height];
  }

  moreZoom(): void {
    const width = this.view[0] + 350;
    const height = this.view[1];
    this.view = [width > this.maxViewWidth ? this.maxViewWidth : width, height];
  }
}
