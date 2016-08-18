import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChatService} from './chat.service';
import {DataComponent} from "../../interfaces/data-interface";
import {CollapseDirective} from 'ng2-bootstrap/ng2-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.css'],
  directives: [CollapseDirective],
  providers: [ChatService]
})

export class ChatComponent implements OnInit, DataComponent, OnDestroy {

  messageError = "";

  constructor(public chatService: ChatService) {
  }

  get errorCollapse() {
    return this.messageError == "";
  }

  get chatMessages() {
    return this.chatService.chatMessages;
  }

  getInitialData() {
    this.chatService.updateChat();
  }

  ngOnInit() {
    this.getInitialData();
  }

  submitMessage(text) {
    var self = this;
    function handleData(data) {
      if (data.success) {
        text.value = "";
        self.messageError = "";
      } else {
        self.messageError = data.err;
      }
    }

    if (text.value.length > 0) {
      this.chatService.send(text.value)
        .subscribe(data => handleData(data));
    }
  }

  ngOnDestroy() {
    this.chatService.destroyListener();
  }

}
