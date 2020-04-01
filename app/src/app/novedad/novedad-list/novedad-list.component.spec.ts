import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadListComponent } from './novedad-list.component';

xdescribe('NovedadListComponent', () => {
  let component: NovedadListComponent;
  let fixture: ComponentFixture<NovedadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovedadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovedadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
