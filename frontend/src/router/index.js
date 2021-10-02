import { createRouter, createWebHistory } from 'vue-router';

import Signup from '../views/Signup.vue';
import Signin from '../views/Signin.vue';
import Tchat from '../views/Tchat.vue';
import OneMsg from '../views/OneMsg.vue';
import Warn from '../views/Warn.vue';
import Profil from '../views/Profil.vue';

const routes = [

  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/onemsg/:id',
    name: 'OneMsg',
    component: OneMsg
  },
  {
    path: '/tchat',
    name: 'Tchat',
    component: Tchat
  },
  {
    path: '/warn',
    name: 'Warn',
    component: Warn
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  /* { path: '*', component: 404 } */
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
