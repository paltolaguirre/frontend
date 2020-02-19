import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaDraggableSpaceComponent } from './formula-draggable-space.component';

describe('FormulaDraggableSpaceComponent', () => {
  let component: FormulaDraggableSpaceComponent;
  let fixture: ComponentFixture<FormulaDraggableSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulaDraggableSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaDraggableSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
