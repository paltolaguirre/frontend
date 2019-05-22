import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConceptoComponent } from './add-concepto.component';

describe('AddConceptoComponent', () => {
  let component: AddConceptoComponent;
  let fixture: ComponentFixture<AddConceptoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddConceptoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
