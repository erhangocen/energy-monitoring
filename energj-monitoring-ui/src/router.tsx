import { createBrowserRouter } from 'react-router-dom';
import GeneralError from './pages/errors/general-error';
import NotFoundError from './pages/errors/not-found-error';
import MaintenanceError from './pages/errors/maintenance-error';

const router = createBrowserRouter([
  // Main routes
  {
    path: '/',
    lazy: async () => {
      const AppShell = await import('./components/app-shell');
      return { Component: AppShell.default };
    },
    errorElement: <GeneralError />,
    children: [
      {
        lazy: async () => ({
          Component: (await import('./components/auth-not-required-pages'))
            .default,
        }),
        children: [
          {
            path: '/sign-in',
            lazy: async () => ({
              Component: (await import('./pages/auth/sign-in')).default,
            }),
          },
          {
            path: '/sign-in-2',
            lazy: async () => ({
              Component: (await import('./pages/auth/sign-in-2')).default,
            }),
          },
          {
            path: '/register',
            lazy: async () => ({
              Component: (await import('./pages/auth/sign-up')).default,
            }),
          },
          {
            path: '/passreset',
            lazy: async () => ({
              Component: (await import('./pages/auth/password-reset-confirm'))
                .default,
            }),
          },
          {
            path: '/forgot-password',
            lazy: async () => ({
              Component: (await import('./pages/auth/forgot-password')).default,
            }),
          },
          {
            path: '/otp',
            lazy: async () => ({
              Component: (await import('./pages/auth/otp')).default,
            }),
          },
        ],
      },
      {
        lazy: async () => ({
          Component: (await import('./components/auth-required-pages')).default,
        }),
        children: [
          // Sadece mevcut ve import edilebilen dashboard ve admin route'ları bırakıyorum
          {
            path: '/dashboard',
            lazy: async () => ({
              Component: (await import('./pages/dashboard')).default,
            }),
            children: [
              {
                path: 'report',
                lazy: async () => ({
                  Component: (await import('./pages/dashboard/pages/report'))
                    .default,
                }),
              },
            ],
          },
        ],
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
]);

export default router;
