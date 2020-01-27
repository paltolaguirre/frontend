import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTopMenuToolbarComponent } from './common-top-menu-toolbar.component';

describe('CommonTopMenuToolbarComponent', () => {
  let component: CommonTopMenuToolbarComponent;
  let fixture: ComponentFixture<CommonTopMenuToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTopMenuToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTopMenuToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
