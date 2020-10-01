/* ============
 * Routes File
 * ============
 *
 * The routes and redirects are defined in this file.
 */

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import Code from '../pages/Code';
import Activate from '../pages/Activate';
import ForgotPassword from '../pages/ForgotPassword';
import Gdpr from '../pages/Gdpr';
import About from '../pages/About';

export default [
  // Home
  {
    path: '/',
    name: 'home.index',
    component: Home,
    meta: {
      auth: true,
      title: 'Home',
      noShadow: true,
    },
  },
  {
    path: '/login',
    name: 'login.index',
    component: Login,
    meta: {
      guest: true,
    },
  },
  {
    path: '/register',
    name: 'register.index',
    component: Register,
    meta: {
      guest: true,
    },
  },
  {
    path: '/activate',
    name: 'activate.index',
    component: Activate,
    meta: {
      guest: true,
    },
  },
  {
    path: '/events',
    name: 'events.index',
    component: Events,
    meta: {
      auth: true,
      title: 'Events',
      noShadow: true,
    },
  },
  {
    path: '/gdpr-toc',
    name: 'gdpr.index',
    component: Gdpr,
    meta: {
      hideBg: true,
      title: 'Terms',
    },
  },
  {
    path: '/about',
    name: 'about.index',
    component: About,
    meta: {
      hideBg: true,
      title: 'About',
    },
  },
  {
    path: '/code/:eventId',
    name: 'code.index',
    component: Code,
    meta: {
      hideNav: true,
      hideBg: true,
    },
  },
  {
    path: '/profile',
    name: 'profile.index',
    component: Profile,
    meta: {
      title: 'Profile',
    },
  },
  {
    path: '/forgot',
    name: 'forgot.index',
    component: ForgotPassword,
    meta: {
      guest: true,
      hideNav: true,
    },
  },
  {
    path: '/',
    redirect: '/',
  },
  {
    path: '/*',
    redirect: '/',
  },
];
