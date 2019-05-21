import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPage } from './selector.page';

describe('SelectorPage', () => {
  let component: SelectorPage;
  let fixture: ComponentFixture<SelectorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
