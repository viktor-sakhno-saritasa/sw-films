import { executeAdd } from './pages/add';
import { executeEdit } from './pages/edit';
import { executeFilm } from './pages/film';
import { executeIndex } from './pages/index';
import { executeLogin } from './pages/login';

/**
 * Run an app.
 */
function run(): void {
  const route: Record<string, Function> = {
    '/index.html': executeIndex,
    '/login.html': executeLogin,
    '/film.html': executeFilm,
    '/add.html': executeAdd,
    '/edit.html': executeEdit,
  };

  const { pathname } = window.location;

  if (pathname in route && typeof route[pathname] === 'function') {
    const execute = route[pathname] as Function;
    execute();
  } else {
    throw new Error('Pathname is not in route object.');
  }
}

run();
