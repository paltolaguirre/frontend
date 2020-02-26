import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionPrintCompletoComponent } from './liquidacion-print-completo.component';

describe('LiquidacionPrintCompletoComponent', () => {
  let component: LiquidacionPrintCompletoComponent;
  let fixture: ComponentFixture<LiquidacionPrintCompletoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionPrintCompletoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionPrintCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
