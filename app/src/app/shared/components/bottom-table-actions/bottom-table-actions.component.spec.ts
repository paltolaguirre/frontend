import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomTableActionsComponent } from './bottom-table-actions.component';

describe('BottomTableActionsComponent', () => {
  let component: BottomTableActionsComponent;
  let fixture: ComponentFixture<BottomTableActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomTableActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
