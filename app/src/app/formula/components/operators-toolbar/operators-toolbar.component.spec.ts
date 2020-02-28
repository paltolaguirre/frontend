import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorsToolbarComponent } from './operators-toolbar.component';

describe('OperatorsToolbarComponent', () => {
  let component: OperatorsToolbarComponent;
  let fixture: ComponentFixture<OperatorsToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorsToolbarComponent ],
      imports: [
        MaterialModule,
        BrowserAnimationsModule
      ]
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
