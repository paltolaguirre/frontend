import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptoListComponent } from './concepto-list.component';

describe('ConceptoListComponent', () => {
  let component: ConceptoListComponent;
  let fixture: ComponentFixture<ConceptoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConceptoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConceptoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
