import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableRowActionsComponent } from './table-row-actions.component';

describe('TableRowActionsComponent', () => {
  let component: TableRowActionsComponent;
  let fixture: ComponentFixture<TableRowActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableRowActionsComponent ],
      imports: [
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onEditClick', () => {
    it('should emit from editEmiiter', () => {
      const emitterSpy = spyOn(component.editEmitter, 'emit');

      component.onEditClick();

      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDeleteClick', () => {
    it('should emit from deleteEmitter', () => {
      const emitterSpy = spyOn(component.deleteEmitter, 'emit');

      component.onDeleteClick();

      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });
  });
});
