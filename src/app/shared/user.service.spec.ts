/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { UserService } from '../shared/user.service';

describe('Service: Global', () => {
  beforeEach(() => {
    addProviders([UserService]);
  });

  it('should ...',
    inject([UserService],
      (service: UserService) => {
        expect(service).toBeTruthy();
      }));
});
