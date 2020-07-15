import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionListPrintComponent } from './liquidacion-list-print.component';

describe('LiquidacionListPrintComponent', () => {
  let component: LiquidacionListPrintComponent;
  let fixture: ComponentFixture<LiquidacionListPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionListPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionListPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
