import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { FilmsService } from 'src/app/core/services/films.service';

import { DeleteDialogOverviewComponent } from '../delete-dialog-overview/delete-dialog-overview.component';

/** Component for delete dialog. */
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {

  /** Episode of the film. */
  @Input('episode')
  public episode!: number;

  public constructor(
    public dialog: MatDialog,
    private readonly filmsService: FilmsService,
    private readonly route: Router,
  ) { }

  /** Open dialog handler. */
  public openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogOverviewComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(this.episode);
      }
    });
  }

  /**
   * Delete film after closed dialog.
   * @param id Id of the film.
   */
  public delete(id: number): void {
    this.filmsService.delete(id)
      .pipe(
        take(1),
      )
      .subscribe(() => this.route.navigate(['/']));
  }
}

