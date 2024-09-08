/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProfileSearchService } from './profile-search.service';

describe('Service: ProfileSearch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileSearchService]
    });
  });

  it('should ...', inject([ProfileSearchService], (service: ProfileSearchService) => {
    expect(service).toBeTruthy();
  }));
});
