import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaItemPickerComponent } from './formula-item-picker.component';

describe('FormulaItemPickerComponent', () => {
  let component: FormulaItemPickerComponent;
  let fixture: ComponentFixture<FormulaItemPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaItemPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaItemPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
