import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCreateContainer } from './formula-create.container';

describe('FormulaCreateContainer', () => {
  let component: FormulaCreateContainer;
  let fixture: ComponentFixture<FormulaCreateContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCreateContainer ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnDestroy', () => {
    it('should destroy the params observable', () => {
      const nextSpy = spyOn(component.destroyed$, 'next');
      const completeSpy = spyOn(component.destroyed$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });
});
