import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosueldosdigitalListComponent } from './librosueldosdigital-list.component';

xdescribe('LibrosueldosdigitalListComponent', () => {
  let component: LibrosueldosdigitalListComponent;
  let fixture: ComponentFixture<LibrosueldosdigitalListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosueldosdigitalListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosueldosdigitalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
