import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContabilizarDialogComponent } from './contabilizar-dialog.component';

xdescribe('ContabilizarDialogComponent', () => {
  let component: ContabilizarDialogComponent;
  let fixture: ComponentFixture<ContabilizarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContabilizarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContabilizarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
