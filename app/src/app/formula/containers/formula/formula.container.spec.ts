import { FormulaItemPickerComponent } from './../../components/formula-item-picker/formula-item-picker.component';
import { SharedModule } from './../../../shared/shared.module';
import { MatDialog } from '@angular/material/dialog';
import { FormulaService } from './../../../core/services/formula/formula.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaContainer } from './formula.container';
import { Formula } from 'src/app/core/models/formula.model';

describe('FormulaContainer', () => {
  let component: FormulaContainer;
  let fixture: ComponentFixture<FormulaContainer>;
  let formulaService: FormulaService;
  let dialog: MatDialog;

  const fakeFormulaItem: Formula = {
    name: 'Formula 1',
    CreatedAt: '',
    UpdatedAt: '',
    DeletedAt: '',
    params: [],
    description: 'Esta es una formula',
    origin: '',
    type: '',
    scope: '',
    result: '',
    value: 1,
    valueid: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaContainer, FormulaItemPickerComponent ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule
      ]
    })
    .compileComponents();

    formulaService = TestBed.get(FormulaService);
    dialog = TestBed.get(MatDialog);
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
    it('should set the current formula by its name', () => {
      expect(component.currentFormula).toBeNull();

      const findSpy = spyOn(formulaService, 'find').and.returnValue(fakeFormulaItem);

      component.setCurrentFormula('Formula 1');

      expect(findSpy).toHaveBeenCalledWith(1);
      expect(component.currentFormula).toEqual(fakeFormulaItem);
    });

    it('should build a form with preloaded data', () => {
      spyOn(formulaService, 'find').and.returnValue(fakeFormulaItem);
      const buildFormSpy = spyOn(component, 'buildPreLoadedForm');

      component.setCurrentFormula('Formula 1');

      expect(buildFormSpy).toHaveBeenCalledTimes(1);
    });

    it('should call to showNoDataDialog() if the current formula is null', () => {
      spyOn(formulaService, 'find').and.returnValue(null);
      const spy = spyOn(component, 'showNoDataDialog');

      component.setCurrentFormula('Formula 1');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
