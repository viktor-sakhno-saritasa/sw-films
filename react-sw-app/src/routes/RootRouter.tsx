import { filmsRoutes } from '../features/Films/routes';
import { authRoutes } from '../features/Login/routes';

export const router = [
  ...authRoutes,
  ...filmsRoutes,
];
