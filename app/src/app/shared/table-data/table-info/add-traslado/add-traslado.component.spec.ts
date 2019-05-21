import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrasladoPage } from './add-traslado.page';

describe('AddTrasladoPage', () => {
  let component: AddTrasladoPage;
  let fixture: ComponentFixture<AddTrasladoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrasladoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrasladoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
