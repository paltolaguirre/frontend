import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiradigShowComponent } from './siradig-show.component';

describe('SiradigShowComponent', () => {
  let component: SiradigShowComponent;
  let fixture: ComponentFixture<SiradigShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiradigShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiradigShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
