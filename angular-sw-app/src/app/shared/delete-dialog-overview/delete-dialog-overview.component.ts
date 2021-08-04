import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

/** Overview delete dialog. */
@Component({
  selector: 'app-delete-dialog-overview',
  templateUrl: './delete-dialog-overview.component.html',
  styleUrls: ['./delete-dialog-overview.component.scss'],
})
export class DeleteDialogOverviewComponent {

  public constructor(public readonly dialogRef: MatDialogRef<DeleteDialogOverviewComponent>) {}

  /** Cancel handler. */
  public onNoClick(): void {
    this.dialogRef.close();
  }
}
