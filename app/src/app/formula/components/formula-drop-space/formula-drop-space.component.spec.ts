import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaDropSpaceComponent } from './formula-drop-space.component';

describe('FormulaDropSpaceComponent', () => {
  let component: FormulaDropSpaceComponent;
  let fixture: ComponentFixture<FormulaDropSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaDropSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaDropSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
