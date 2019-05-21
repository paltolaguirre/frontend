import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepikerPage } from './datepiker.page';

describe('DatepikerPage', () => {
  let component: DatepikerPage;
  let fixture: ComponentFixture<DatepikerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepikerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepikerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
