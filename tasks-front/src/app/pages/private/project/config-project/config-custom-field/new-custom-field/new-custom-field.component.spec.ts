import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCustomFieldComponent } from './new-custom-field.component';

describe('EditCustomFieldComponent', () => {
  let component: NewCustomFieldComponent;
  let fixture: ComponentFixture<NewCustomFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCustomFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
