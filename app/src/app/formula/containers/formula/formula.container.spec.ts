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
    it('should get the current formula by id from FormulaService', () => {
      const findSpy = spyOn(formulaService, 'find');

      component.setCurrentFormula(1);

      expect(findSpy).toHaveBeenCalledWith(1);
    });
  });
});
