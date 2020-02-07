import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../../material.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectorComponent } from './year-selector.component';

describe('YearSelectorComponent', () => {
  let component: YearSelectorComponent;
  let fixture: ComponentFixture<YearSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearSelectorComponent ],
      imports: [
        MaterialModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getMinimumYear', () => {
    it('should return the minimum default year if there is not a minDate given', () => {
      component.minDate = null;

      expect(component.getMinimumYear()).toEqual(component.MIN_DEFAULT_YEAR);
    });

    it('should return the full year of the minDate received', () => {
      const aGivenDate = new Date();
      const year = aGivenDate.getFullYear();

      component.minDate = aGivenDate;

      expect(component.getMinimumYear()).toEqual(year);
    });
  });
});
