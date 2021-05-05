import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {RequestService} from "../services/request.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  messageObjs;
  messageObjSelected;
  @Output() messageObjSelectedEmitter = new EventEmitter<any>();

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.getMessages();
  }

  getMessages(): any {
    setInterval(() => {
      this.requestService.getMessages().subscribe(res => {
        this.messageObjs = res;
      });
    }, 5000);
  }

  onMessageObjSelected(messageObj): void {
    this.messageObjSelected = messageObj;
    this.messageObjSelectedEmitter.emit(this.messageObjSelected);
  }

  newMessage(): void {
    this.messageObjSelected = {};
    this.messageObjSelectedEmitter.emit({});
  }
}
