import { MatDialogRefMock } from './../../../core/mocks/mat-dialogref.mock';
import { FormulaFixtures } from './../../../core/fixtures/formulas.fixtures';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from './../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCloneDialogComponent } from './formula-clone-dialog.component';

describe('FormulaCloneDialogComponent', () => {
  let component: FormulaCloneDialogComponent;
  let fixture: ComponentFixture<FormulaCloneDialogComponent>;
  let matDialogRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports: [
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        SharedModule,
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();

    matDialogRef = TestBed.get(MatDialogRef);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCloneDialogComponent);
    component = fixture.componentInstance;

    component.data.formula = FormulaFixtures.getAll()[4];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('apply', () => {
    it('should prepare the formula', () => {
      const prepareFormulaSpy = spyOn(component, 'prepareFormula');

      component.apply();

      expect(prepareFormulaSpy).toHaveBeenCalledTimes(1);
    });

    it('should call to dialogRef to close the modal', () => {
      const closeModalSpy = spyOn(matDialogRef, 'close').and.returnValue(null);

      component.apply();

      expect(closeModalSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('prepareFormula', () => {
    it('should set the formula origin as custom', () => {
      const formula = component.prepareFormula();

      expect(formula.origin).toEqual('custom');
    });
  });
});
