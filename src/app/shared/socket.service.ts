import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class SocketService {


  private io = io('http://127.0.0.1:4201');
  constructor() {
    console.log("SocketService construct")
  }

  get(event) {
    return Observable.create(observer => {
      this.io.on(event, (data) => {
        observer.next(data);
      });
      return () => {
        this.io.disconnect();
      };
    })
  }
}
