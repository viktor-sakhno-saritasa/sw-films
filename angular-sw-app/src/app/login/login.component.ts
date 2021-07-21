import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { Router } from '@angular/router';

import { UserService } from '../core/services/user.service';

/**
 * For login logic.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public constructor(
    private route: Router,
    private userService: UserService,
    private location: Location,
  ) { }

  /** Init component. */
  public ngOnInit(): void {
    /** Init component. */
  }

  /**
   * Event handler for go back button.
   */
  public goBack(): void {
    this.location.back();
  }

  /**
   * Event handler for google auth button.
   */
  public login(): void {
    this.userService.login()
      .subscribe(() => {
        this.route.navigate(['']);
      });
  }

}
