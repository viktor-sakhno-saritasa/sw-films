import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

/** Header of an application. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** Current user observable. */
  public readonly user$: Observable<User | null>;

  /** @constructor */
  public constructor(private readonly userService: UserService, private readonly route: Router) {
    this.user$ = this.userService.getUser();
  }

  /** Event handler for logout button. */
  public onLogoutClick(): void {
    this.userService.logout();
    this.route.navigate(['/']);
  }
}
