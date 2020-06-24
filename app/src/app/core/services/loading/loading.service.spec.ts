import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('show', () => {
    it('should emit a true state of the emitter', () => {
      const emitterSpy = spyOn(service.loadingEmitter, 'emit');

      service.show();

      expect(emitterSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('hide', () => {
    it('should emit a false state of the emitter', () => {
      const emitterSpy = spyOn(service.loadingEmitter, 'emit');

      service.hide();

      expect(emitterSpy).toHaveBeenCalledWith(false);
    });
  });
});
