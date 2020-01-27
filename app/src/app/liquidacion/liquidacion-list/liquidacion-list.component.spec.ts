import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionListComponent } from './liquidacion-list.component';

xdescribe('LiquidacionListComponent', () => {
  let component: LiquidacionListComponent;
  let fixture: ComponentFixture<LiquidacionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
