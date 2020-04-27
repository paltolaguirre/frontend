import { FormulaFixtures } from './../../../core/fixtures/formulas.fixtures';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from './../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCloneDialogComponent } from './formula-clone-dialog.component';

describe('FormulaCloneDialogComponent', () => {
  let component: FormulaCloneDialogComponent;
  let fixture: ComponentFixture<FormulaCloneDialogComponent>;

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
        { provide: MatDialogRef, useClass: class {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCloneDialogComponent);
    component = fixture.componentInstance;

    component.data.formula = FormulaFixtures.getAll()[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});