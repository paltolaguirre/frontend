import { TestBed } from '@angular/core/testing';

import { LegajoService } from './legajo.service';

describe('LegajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegajoService = TestBed.get(LegajoService);
    expect(service).toBeTruthy();
  });
});
