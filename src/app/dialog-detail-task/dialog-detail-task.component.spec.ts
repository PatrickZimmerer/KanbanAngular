import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailTaskComponent } from './dialog-detail-task.component';

describe('DialogDetailTaskComponent', () => {
  let component: DialogDetailTaskComponent;
  let fixture: ComponentFixture<DialogDetailTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
