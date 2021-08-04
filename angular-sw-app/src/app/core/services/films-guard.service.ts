import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FilmsService } from './films.service';

/** Guard for authorization.*/
@Injectable({
  providedIn: 'root',
})
export class FilmsGuardService implements CanActivate, CanActivateChild {

  public constructor(private readonly filmsService: FilmsService, private readonly router: Router) {}

  /**
   * @inheritdoc
   */
  public canActivateChild(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(route);
  }

  /**
   * @inheritdoc
   */
  public canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    const id = Number(route.params.id);

    return this.filmsService.getFilm(id)
      .pipe(
        map(film => {
          if (film) {
            return true;
          }
          this.goToMainPage();
          return false;
        }),
      );
  }

  /** Redirect user to main page. */
  private goToMainPage(): void {
    this.router.navigate(['/']);
  }
}
