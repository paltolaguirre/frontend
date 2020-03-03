import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionPrintComponent } from './liquidacion-print.component';

xdescribe('LiquidacionPrintComponent', () => {
  let component: LiquidacionPrintComponent;
  let fixture: ComponentFixture<LiquidacionPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
