import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { F931ListComponent } from './f931-list.component';

describe('F931ListComponent', () => {
  let component: F931ListComponent;
  let fixture: ComponentFixture<F931ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ F931ListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(F931ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
