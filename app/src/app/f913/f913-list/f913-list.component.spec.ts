import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { F913ListComponent } from './f913-list.component';

describe('F913ListComponent', () => {
  let component: F913ListComponent;
  let fixture: ComponentFixture<F913ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ F913ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(F913ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
