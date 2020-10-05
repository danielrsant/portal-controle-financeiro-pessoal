import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputFileComponent } from './user-input-file.component';

describe('UserInputFileComponent', () => {
  let component: UserInputFileComponent;
  let fixture: ComponentFixture<UserInputFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInputFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInputFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
