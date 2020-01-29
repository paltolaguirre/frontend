import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaCreateContainer } from './formula-create.container';

describe('FormulaCreateContainer', () => {
  let component: FormulaCreateContainer;
  let fixture: ComponentFixture<FormulaCreateContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaCreateContainer ]
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
});
