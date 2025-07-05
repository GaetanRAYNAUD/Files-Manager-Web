import { layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  route('/', 'pages/Login.tsx'),
  route('/oauth2', 'pages/OAuth.tsx'),
  route('/oidc/:id', 'pages/Oidc.tsx'),
  layout('layouts/RootLayout.tsx', [
    layout('layouts/AuthLayout.tsx', [
      // index('pages/home/Home.tsx'),
      // route('/profile', 'pages/user/ProfilePage.tsx'),
      // route('/my', 'pages/assortmentLibrary/MyPage.tsx'),
      // route('/shared', 'pages/assortmentLibrary/SharedPage.tsx')
    ])
  ])
] satisfies RouteConfig;
