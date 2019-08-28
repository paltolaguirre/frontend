import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosueldosListPrintComponent } from './librosueldos-list-print.component';

describe('LibrosueldosListPrintComponent', () => {
  let component: LibrosueldosListPrintComponent;
  let fixture: ComponentFixture<LibrosueldosListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosueldosListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosueldosListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
