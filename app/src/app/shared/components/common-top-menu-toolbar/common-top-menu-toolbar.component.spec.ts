import { PrintService } from 'src/app/print/print.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTopMenuToolbarComponent } from './common-top-menu-toolbar.component';

describe('CommonTopMenuToolbarComponent', () => {
  let component: CommonTopMenuToolbarComponent;
  let fixture: ComponentFixture<CommonTopMenuToolbarComponent>;
  let printService: PrintService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTopMenuToolbarComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule,
        NoopAnimationsModule
      ]
    })
    .compileComponents();

    printService = TestBed.get(PrintService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTopMenuToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onNewButtonClick()', () => {
    it('should emit from newResourceEmitter', () => {
      const emitterSpy = spyOn(component.newResourceEmitter, 'emit');

      component.onNewButtonClick();

      expect(emitterSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onPrintButtonClick()', () => {
    it('should call PrintService to print in pdf', () => {
      const printToPdfSpy = spyOn(printService, 'printTOPDF');

      component.onPrintButtonClick();

      expect(printToPdfSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('doFilter()', () => {
    it('should emit the input event result to its parent', () => {
      const fakeKeyUpEvent = {
        target: {
          value: 'a'
        }
      };

      const emitterSpy = spyOn(component.filterEmitter, 'emit');

      component.doFilter(fakeKeyUpEvent);

      expect(emitterSpy).toHaveBeenCalledWith('a');
    });
  });
});
