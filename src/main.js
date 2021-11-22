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
      beforeEnter(to, from, next) {
        console.log('User beforeEnter', to, from);
        next()
      }
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
  scrollBehavior(to, from, savedPosition) {
    // console.log(savedPosition);
    if (savedPosition) {
      return savedPosition
    }
    return {
      left: 0,
      top: 0
    }
  }
});

router.beforeEach((to, from, next) => {
  console.log("Global beforeEach");
  console.log(to, from);
  // if (to.name === "TeamMembers") {
  //   next()
  // } else {
  //   next({name: "TeamMembers", params: {teamId: "t2"}})
  // }
  next()
})

const app = createApp(App);

app.use(router);

app.mount('#app');
