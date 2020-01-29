import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCreateComponent } from './formula-create.component';

describe('FormulaCreateComponent', () => {
  let component: FormulaCreateComponent;
  let fixture: ComponentFixture<FormulaCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
