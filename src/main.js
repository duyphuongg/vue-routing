import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamFooter from './components/teams/TeamFooter.vue';
import UserFooter from './components/users/UserFooter.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    {
      name: 'Users',
      path: '/users',
      components: {
        default: UsersList,
        footer: UserFooter,
      },
    },
    {
      name: 'Teams',
      path: '/teams',
      components: {
        default: TeamsList,
        footer: TeamFooter,
      },
      children: [
        {
          name: 'TeamMembers',
          path: ':teamId',
          component: TeamMembers,
          props: true,
        },
      ],
    },
    // { name: "TeamMembers", path: "/teams/:teamId", component: TeamMembers, props: true },
    // { path: "/:notFound(.*)", redirect: "/teams" },
    { path: '/:notFound(.*)', component: NotFound },
  ],
  linkActiveClass: 'active',
});

const app = createApp(App);

app.use(router);

app.mount('#app');
