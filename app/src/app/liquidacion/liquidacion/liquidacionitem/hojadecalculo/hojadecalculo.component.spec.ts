import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HojadecalculoComponent } from './hojadecalculo.component';

describe('HojadecalculoComponent', () => {
  let component: HojadecalculoComponent;
  let fixture: ComponentFixture<HojadecalculoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HojadecalculoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HojadecalculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
