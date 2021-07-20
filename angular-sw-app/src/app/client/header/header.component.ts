import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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

  /** Current user. */
  public user?: User;

  public constructor(
    private userService: UserService,
  ) { }

  /**
   * Get user state after creating a component.
   */
  public ngOnInit(): void {
    this.getUser();
  }

  /**
   * Initialize user state in header.
   */
  private getUser(): void {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });
  }
}
