import { Component, Inject, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FilmsService } from 'src/app/core/services/films.service';
import { DeleteDialogOverviewComponent } from '../delete-dialog-overview/delete-dialog-overview.component';

export interface DialogData {

}

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  @Input('episode')
  public episode!: number;

  /** @constructor */
  public constructor(
    public dialog: MatDialog,
    private readonly filmsService: FilmsService,
    private readonly route: Router,
    ) { }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogOverviewComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(this.episode);
      }
    });
  }

  public delete(id: number) {
    this.filmsService.delete(id)
      .pipe(
        take(1),
      )
      .subscribe(() => this.route.navigate(['/']));
  }
}

