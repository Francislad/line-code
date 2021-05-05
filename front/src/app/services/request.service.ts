import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) {
  }

  be = environment.senderIp;

  getMessages(): any {
    const url = this.be + 'messages';
    return this.http.get(url);
  }

  sendMessage(message): any {
    const url = this.be + 'send';
    return this.http.post(url, {message});
  }
}
