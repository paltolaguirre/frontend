import { TestBed } from '@angular/core/testing';

import { ConceptoService } from './concepto.service';

xdescribe('ConceptoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConceptoService = TestBed.get(ConceptoService);
    expect(service).toBeTruthy();
  });
});
