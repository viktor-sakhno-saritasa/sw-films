import { auth, googleProvider } from '../../firebase';
import User from '../../models/User';
import UserDto from '../dtos/userDto';

/** Login user with firestore. */
export const login = async (): Promise<User | undefined> => {
  try {
    const response = await auth.signInWithPopup(googleProvider);
    const userDto = response.additionalUserInfo?.profile as UserDto;
    return {
      email: userDto.email,
      name: userDto.name,
      picture: userDto.picture,
    } as User;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/** Logout user from firestore. */
export const logout = async (): Promise<void | undefined> => {
  try {
    return await auth.signOut();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
