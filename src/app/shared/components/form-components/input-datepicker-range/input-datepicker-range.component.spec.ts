import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputDatepickerRangeComponent } from './input-datepicker-range.component';

describe('InputDatepickerRangeComponent', () => {
  let component: InputDatepickerRangeComponent;
  let fixture: ComponentFixture<InputDatepickerRangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputDatepickerRangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDatepickerRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
