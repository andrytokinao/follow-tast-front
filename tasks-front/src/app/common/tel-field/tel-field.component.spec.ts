import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelFieldComponent } from './tel-field.component';

describe('TelFieldComponent', () => {
  let component: TelFieldComponent;
  let fixture: ComponentFixture<TelFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TelFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
