import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  be = 'http://localhost:8080/';

  getMessages(): any {
    const url = this.be + 'messages';
    return this.http.get(url);
  }

  sendMessage(message): any {
    const url = this.be + 'send';
    return this.http.post(url, {message});
  }
}
