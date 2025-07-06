import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/', 'pages/Home.tsx'),
  route('/authenticated/:id', 'pages/Oidc.tsx'),
  layout('layouts/RootLayout.tsx', [
    layout('layouts/AuthLayout.tsx', [
      index('pages/Home.tsx', { id: 'home-auth' }),
      route('/profile', 'pages/user/Profile.tsx')
    ])
  ])
] satisfies RouteConfig;
