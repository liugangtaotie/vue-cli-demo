import { createRouter, createWebHashHistory } from 'vue-router';
import Index from '../components/HelloWorld.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
  ],
});
