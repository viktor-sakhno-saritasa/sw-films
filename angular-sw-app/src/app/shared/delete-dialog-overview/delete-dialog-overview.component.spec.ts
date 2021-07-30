import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDialogOverviewComponent } from './delete-dialog-overview.component';

describe('DeleteDialogOverviewComponent', () => {
  let component: DeleteDialogOverviewComponent;
  let fixture: ComponentFixture<DeleteDialogOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDialogOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
