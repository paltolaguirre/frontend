import { LegajoServiceMock } from './../../../core/mocks/legajo.service.mock';
import { LegajoService } from './../../../legajo/legajo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulasContainer } from './formulas.container';

describe('FormulasContainer', () => {
  let component: FormulasContainer;
  let fixture: ComponentFixture<FormulasContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormulasContainer ],
      imports: [
        RouterTestingModule,
        SharedModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: LegajoService, useClass: LegajoServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulasContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});