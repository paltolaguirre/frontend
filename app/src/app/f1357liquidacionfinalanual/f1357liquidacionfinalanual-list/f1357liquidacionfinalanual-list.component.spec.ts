import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { F1357liquidacionfinalanualListComponent } from './f1357liquidacionfinalanual-list.component';

xdescribe('FcargassocialesListComponent', () => {
  let component: F1357liquidacionfinalanualListComponent;
  let fixture: ComponentFixture<F1357liquidacionfinalanualListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ F1357liquidacionfinalanualListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(F1357liquidacionfinalanualListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
