import { TestBed } from '@angular/core/testing';

import { F913Service } from './f913.service';

describe('F913Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: F913Service = TestBed.get(F913Service);
    expect(service).toBeTruthy();
  });
});
