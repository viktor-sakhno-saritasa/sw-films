import User from '../../models/User';
import UserDto from '../dtos/userDto';

/**
 * Map DTO to User model.
 * @param dto User Dto.
 * @returns User model.
 */
export const userMapper = (dto: UserDto): User => new User({
  name: dto.name,
  email: dto.email,
  picture: dto.picture,
});
