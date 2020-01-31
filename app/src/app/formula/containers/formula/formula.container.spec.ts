import { FormulaService } from './../../../core/services/formula/formula.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaContainer } from './formula.container';

describe('FormulaContainer', () => {
  let component: FormulaContainer;
  let fixture: ComponentFixture<FormulaContainer>;
  let formulaService: FormulaService;

  const fakeFormulaItem = {
    id: 1,
    name: 'Formula 1',
    description: 'Esta es una formula'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaContainer ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    formulaService = TestBed.get(FormulaService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setCurrentFormula', () => {
    it('should set the current formula', () => {
      expect(component.currentFormula).toBeNull();

      const findSpy = spyOn(formulaService, 'find').and.returnValue(fakeFormulaItem);

      component.setCurrentFormula(1);

      expect(findSpy).toHaveBeenCalledWith(1);
      expect(component.currentFormula).toEqual(fakeFormulaItem);
    });

    // it('should ')
  });
});
