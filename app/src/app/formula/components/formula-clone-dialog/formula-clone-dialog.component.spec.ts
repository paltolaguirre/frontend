import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCloneDialogComponent } from './formula-clone-dialog.component';

describe('FormulaCloneDialogComponent', () => {
  let component: FormulaCloneDialogComponent;
  let fixture: ComponentFixture<FormulaCloneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCloneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCloneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
