import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashComponent } from './trash.component';

describe('TrashComponent', () => {
  let component: TrashComponent;
  let fixture: ComponentFixture<TrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onTrashDragOver', () => {
    it('should activate the dragenter state', () => {
      const event = new Event('ondragover');
      const dragEnterSpy = spyOn(component, 'setTrashDragEnterState');

      component.onTrashDragOver(event);

      expect(dragEnterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onTrashDrop', () => {
    it('should deactivate the dragenter state', () => {
      const event = new Event('ondragover');
      const dragLeaveSpy = spyOn(component, 'setTrashDragLeaveState');

      component.onTrashDrop(event);

      expect(dragLeaveSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('setTrashDragEnterState', () => {
    it('should set isTrashDragOver state to true', () => {
      component.isTrashDragOver = false;

      component.setTrashDragEnterState();

      expect(component.isTrashDragOver).toBeTruthy();
    });
  });

  describe('setTrashDragLeaveState', () => {
    it('should set isTrashDragOver state to false', () => {
      component.isTrashDragOver = true;

      component.setTrashDragLeaveState();

      expect(component.isTrashDragOver).toBeFalsy();
    });
  });
});
