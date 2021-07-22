import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';

/**
 * Header of an application.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  /** Current user stream. */
  public user$: Observable<User | null>;

  public constructor(
    private userService: UserService,
    private route: Router,
  ) {
    this.user$ = this.userService.getUserStream();
  }

  /**
   * Do things after creating a component.
   */
  public ngOnInit(): void {
    /** Init component. */
  }

  /** Event handler for logout button. */
  public logout(): void {
    this.userService.logout();
    this.route.navigate(['/']);
  }
}
