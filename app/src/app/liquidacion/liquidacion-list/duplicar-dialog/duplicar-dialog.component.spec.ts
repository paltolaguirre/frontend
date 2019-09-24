import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicarDialogComponent } from './duplicar-dialog.component';

describe('DuplicarDialogComponent', () => {
  let component: DuplicarDialogComponent;
  let fixture: ComponentFixture<DuplicarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
