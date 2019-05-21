import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorDefaultComponent } from './selector-default.component';

describe('SelectorDefaultComponent', () => {
  let component: SelectorDefaultComponent;
  let fixture: ComponentFixture<SelectorDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectorDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
