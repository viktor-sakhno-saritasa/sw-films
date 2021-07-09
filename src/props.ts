import { FilmDto } from './models/film-dto';
import { UserDto } from './models/user-dto';

/**
 * Interface for props.
 */
export interface Props {

  /** Current user of application. */
  user?: UserDto;

  /** Current filmState of application. */
  filmState?: FilmDto | FilmDto[];

  /** Event handlers for different elements. */
  handlers?: Record<string, Function>;
}
