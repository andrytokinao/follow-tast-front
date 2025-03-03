import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDialogComponent } from './choose-dialog.component';

describe('ChooseDialogComponent', () => {
  let component: ChooseDialogComponent;
  let fixture: ComponentFixture<ChooseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
