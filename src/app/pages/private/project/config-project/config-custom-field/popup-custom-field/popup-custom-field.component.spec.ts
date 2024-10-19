import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCustomFieldComponent } from './popup-custom-field.component';

describe('PopupCustomFieldComponent', () => {
  let component: PopupCustomFieldComponent;
  let fixture: ComponentFixture<PopupCustomFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupCustomFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupCustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
