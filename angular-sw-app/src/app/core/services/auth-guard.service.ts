import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  NavigationExtras,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './user.service';

/**
 * Guard for authorization.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  public constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  /**
   * @inheritdoc
   */
  public canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.currentUser) {
      return true;
    }
    this.goToMainPage();
    return false;
  }

  /**
   * @inheritdoc
   */
  public canActivateChild(): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate();
  }

  /**
   * @inheritdoc
   */
  public canActivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.userService.currentUser) {
      return true;
    }
    this.goToMainPage();
    return false;
  }

  /**
   * Redirect user to main page.
   */
  private goToMainPage(): void {
    this.router.navigate(['/']);
  }

}
