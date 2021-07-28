import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** For login logic. */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {

  private readonly destroy = new Subject();

  public constructor(
    private readonly route: Router,
    private readonly userService: UserService,
    private readonly location: Location,
  ) { }

  /** Event handler for go back button.*/
  public onBackClick(): void {
    this.location.back();
  }

  /** Event handler for google auth button. */
  public onLoginClick(): void {
    this.userService.login()
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.route.navigate(['']);
      });
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }
}
