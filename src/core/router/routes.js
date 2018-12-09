import auth from '../auth';

export default [
  {
    path: '/status',
    title: 'Статус',
    icon: 'mdi-information-outline',
    props: true,
    component: () => import('../../components/pages/status'),
  },

  {
    path: '/settings',
    title: 'Настройки',
    icon: 'mdi-settings-outline',
    props: true,
    meta: {
      authRules: [() => auth.checkAdmin()],
    },
    component: () => import('../../components/pages/settings'),
  },

  {
    path: '/settings/:tab',
    props: true,
    meta: {
      authRules: [() => auth.checkAdmin()],
      hideInMenu: true,
    },
    component: () => import('../../components/pages/settings'),
  },

  {
    path: '/system',
    title: 'Система',
    icon: 'mdi-chip',
    props: true,
    meta: {
      authRules: [() => auth.checkAdmin()],
    },
    component: () => import('../../components/pages/system'),
  },
];
