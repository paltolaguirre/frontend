import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsToolbarComponent } from './operators-toolbar.component';

describe('OperatorsToolbarComponent', () => {
  let component: OperatorsToolbarComponent;
  let fixture: ComponentFixture<OperatorsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorsToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorsToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
