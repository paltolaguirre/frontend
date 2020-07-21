import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionListPrintCompletoComponent } from './liquidacion-list-print-completo.component';

describe('LiquidacionListPrintCompletoComponent', () => {
  let component: LiquidacionListPrintCompletoComponent;
  let fixture: ComponentFixture<LiquidacionListPrintCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionListPrintCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionListPrintCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
