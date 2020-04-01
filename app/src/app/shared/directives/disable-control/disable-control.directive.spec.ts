import { DisableControlDirective } from './disable-control.directive';
import { inject } from '@angular/core/testing';
import { NgControl } from '@angular/forms';

describe('DisableControlDirective', () => {
  it('should create an instance', () => {
    inject([NgControl], (ngControl: NgControl) => {
      const directive = new DisableControlDirective(ngControl);
      expect(directive).toBeTruthy();
    });
  });
});
