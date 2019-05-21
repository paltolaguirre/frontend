import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegajoListComponent } from './legajo-list.component';

describe('LegajoListComponent', () => {
  let component: LegajoListComponent;
  let fixture: ComponentFixture<LegajoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegajoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegajoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
