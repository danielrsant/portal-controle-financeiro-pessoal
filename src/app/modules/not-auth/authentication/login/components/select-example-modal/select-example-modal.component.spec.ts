import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectExampleModalComponent } from './select-example-modal.component';

describe('SelectExampleModalComponent', () => {
  let component: SelectExampleModalComponent;
  let fixture: ComponentFixture<SelectExampleModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectExampleModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectExampleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
