import { PrintServiceMock } from './../../../core/mocks/print.service.mock';
import { PrintService } from './../../../print/print.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomTableActionsComponent } from './bottom-table-actions.component';

describe('BottomTableActionsComponent', () => {
  let component: BottomTableActionsComponent;
  let fixture: ComponentFixture<BottomTableActionsComponent>;
  let printService: PrintService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomTableActionsComponent ],
      providers: [
        { provide: PrintService, useClass: PrintServiceMock }
      ]
    })
    .compileComponents();

    printService = TestBed.get(PrintService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomTableActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickSave', () => {
    it('should emit an event from saveEmitter', () => {
      const emitterSpy = spyOn(component.saveEmitter, 'emit');

      component.onClickSave();

      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClickAbort', () => {
    it('should emit an event from abortEmitter', () => {
      const emitterSpy = spyOn(component.abortEmitter, 'emit');

      component.onClickAbort();

      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onPrintClick', () => {
    it('should print a pdf', () => {
      const printSpy = spyOn(printService, 'printTOPDF');

      component.onPrintClick();

      expect(printSpy).toHaveBeenCalledTimes(1);
    });
  });
});
