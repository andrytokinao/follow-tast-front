import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupWorkFlowComponent } from './popup-work-flow.component';

describe('PopupWorkFlowComponent', () => {
  let component: PopupWorkFlowComponent;
  let fixture: ComponentFixture<PopupWorkFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupWorkFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupWorkFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
