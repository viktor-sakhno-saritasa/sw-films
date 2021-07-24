import { HandlersType } from '../interfaces';
import { UserDto } from '../models/user-dto';
import { UserService } from '../services/user.service';
import LoginView from '../views/login-view';


/**
 * Function for execute login page logic.
 */
export function executeLogin(): void {
  const view = new LoginView();
  const userService = new UserService();

  const handlers: HandlersType = {
    signInHandler(user: UserDto): void {
      userService.addUserToLocalStorage(user);
    },
  };

  view.render(userService.getUser(), handlers);
}
