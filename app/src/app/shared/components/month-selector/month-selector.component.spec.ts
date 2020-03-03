import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthSelectorComponent } from './month-selector.component';
import { FormsModule } from '@angular/forms';

describe('MonthSelectorComponent', () => {
  let component: MonthSelectorComponent;
  let fixture: ComponentFixture<MonthSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthSelectorComponent ],
      imports: [
        FormsModule,
        MaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
