import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLegajoComponent } from './add-legajo.component';

describe('AddLegajoComponent', () => {
  let component: AddLegajoComponent;
  let fixture: ComponentFixture<AddLegajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLegajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLegajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
