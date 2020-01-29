import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaEditContainer } from './formula-edit.container';

describe('FormulaEditContainer', () => {
  let component: FormulaEditContainer;
  let fixture: ComponentFixture<FormulaEditContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaEditContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaEditContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
