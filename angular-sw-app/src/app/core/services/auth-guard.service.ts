import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanLoad,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user';

import { UserService } from './user.service';

/** Guard for authorization.*/
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  private readonly user$: Observable<User | null>;

  public constructor(private readonly userService: UserService, private readonly router: Router) {
    this.user$ = userService.getUser();
  }

  /**
   * @inheritdoc
   */
  public canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    return this.user$.pipe(map(user => {
      if (user) {
        return true;
      }

      this.goToMainPage();
      return false;
    }));
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
    return this.user$.pipe(map(user => {
      if (user) {
        return true;
      }
      this.goToMainPage();
      return false;
    }));
  }

  /** Redirect user to main page. */
  private goToMainPage(): void {
    this.router.navigate(['/']);
  }
}
