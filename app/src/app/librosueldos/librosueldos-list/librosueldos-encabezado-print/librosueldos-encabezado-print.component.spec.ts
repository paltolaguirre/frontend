import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosueldosEncabezadoPrintComponent } from './librosueldos-encabezado-print.component';

xdescribe('LibrosueldosEncabezadoPrintComponent', () => {
  let component: LibrosueldosEncabezadoPrintComponent;
  let fixture: ComponentFixture<LibrosueldosEncabezadoPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosueldosEncabezadoPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosueldosEncabezadoPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
