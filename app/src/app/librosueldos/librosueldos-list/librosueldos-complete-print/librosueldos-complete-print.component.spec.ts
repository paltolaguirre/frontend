import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosueldosCompletePrintComponent } from './librosueldos-complete-print.component';

describe('LibrosueldosCompletePrintComponent', () => {
  let component: LibrosueldosCompletePrintComponent;
  let fixture: ComponentFixture<LibrosueldosCompletePrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosueldosCompletePrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosueldosCompletePrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
