import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosueldosListComponent } from './librosueldos-list.component';

describe('LibrosueldosListComponent', () => {
  let component: LibrosueldosListComponent;
  let fixture: ComponentFixture<LibrosueldosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibrosueldosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibrosueldosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
