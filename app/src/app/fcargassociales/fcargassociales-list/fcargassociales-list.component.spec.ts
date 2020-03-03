import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FcargassocialesListComponent } from './fcargassociales-list.component';

xdescribe('FcargassocialesListComponent', () => {
  let component: FcargassocialesListComponent;
  let fixture: ComponentFixture<FcargassocialesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FcargassocialesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FcargassocialesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
