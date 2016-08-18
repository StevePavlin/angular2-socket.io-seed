import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {APIService} from '../api.service';
import {SocketService} from '../socket.service';
import {SocketComponent} from '../../interfaces';

@Injectable()
export class ChatService extends APIService implements SocketComponent {

  constructor(http:Http, private socket: SocketService) {
    super(http);
  }

  messages = [];
  listener;

  get chatMessages() {
    return this.messages;
  }

  createListener() {
    var self = this;
    this.listener = this.socket.get('chat:message')
        .subscribe(message => {
          self.messages.push(message);
        });
  }

  destroyListener() {
    if (this.listener) {
      this.listener.unsubscribe();
    }
  }

  updateChat() {
    var self = this;
    function handleData(data) {
      if (data.success) {
        self.messages = data.result;
        self.createListener();
      } else {
        return;
      }
    }

    return this.http.get(this.url("/chat"), {withCredentials: true})
      .map(this.extractData)
        .subscribe(data => handleData(data));
  }

  send(message) {
    var request = this.prepareRequest({
      message: message
    });

    return this.http.post(this.url('/chat/send'), request.body, request.options)
      .map(this.extractData);
  }
}
