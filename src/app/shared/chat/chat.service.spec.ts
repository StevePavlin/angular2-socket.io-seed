/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ChatService } from './chat.service';

describe('Service: Chat', () => {
  beforeEach(() => {
    addProviders([ChatService]);
  });

  it('should ...',
    inject([ChatService],
      (service: ChatService) => {
        expect(service).toBeTruthy();
      }));
});
