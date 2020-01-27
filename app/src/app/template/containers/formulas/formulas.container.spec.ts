import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulasContainer } from './formulas.container';

describe('FormulasComponent', () => {
  let component: FormulasContainer;
  let fixture: ComponentFixture<FormulasContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulasContainer ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulasContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
