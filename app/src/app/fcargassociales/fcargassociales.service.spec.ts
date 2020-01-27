import { TestBed } from '@angular/core/testing';

import { FcargassocialesService } from './fcargassociales.service';

xdescribe('FcargassocialesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FcargassocialesService = TestBed.get(FcargassocialesService);
    expect(service).toBeTruthy();
  });
});
