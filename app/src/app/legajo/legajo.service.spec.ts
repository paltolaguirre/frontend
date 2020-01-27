import { TestBed } from '@angular/core/testing';

import { LegajoService } from './legajo.service';

xdescribe('LegajoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LegajoService = TestBed.get(LegajoService);
    expect(service).toBeTruthy();
  });
});
