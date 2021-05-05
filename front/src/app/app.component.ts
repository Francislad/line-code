import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '8B6T';
  messageObjSelected = {};

  messageObjSelectedListener(msgObj): void {
    this.messageObjSelected = msgObj;
  }
}
