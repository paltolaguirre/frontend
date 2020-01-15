import { TestBed } from '@angular/core/testing';

import { SiradigService } from './siradig.service';

describe('SiradigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiradigService = TestBed.get(SiradigService);
    expect(service).toBeTruthy();
  });
});
