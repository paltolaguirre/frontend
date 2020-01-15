import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiradigListComponent } from './siradig-list.component';

describe('SiradigListComponent', () => {
  let component: SiradigListComponent;
  let fixture: ComponentFixture<SiradigListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiradigListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiradigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
