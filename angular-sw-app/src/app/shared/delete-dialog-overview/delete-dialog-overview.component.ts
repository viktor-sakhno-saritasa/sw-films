import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-delete-dialog-overview',
  templateUrl: './delete-dialog-overview.component.html',
  styleUrls: ['./delete-dialog-overview.component.scss']
})
export class DeleteDialogOverviewComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogOverviewComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
