/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { SocketService } from './socket.service';

describe('Service: Socket', () => {
  beforeEach(() => {
    addProviders([SocketService]);
  });

  it('should ...',
    inject([SocketService],
      (service: SocketService) => {
        expect(service).toBeTruthy();
      }));
});
