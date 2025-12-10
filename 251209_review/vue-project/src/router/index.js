import { createRouter, createWebHistory } from 'vue-router'
import ArticleView from '@/views/ArticleView.vue'
import DetailView from '@/views/DetailView.vue'
import CreateView from '@/views/CreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
    path: '/',
    name: 'ArticleView',
    component: ArticleView,
  },
  {
    path: '/article/:id',
    name: 'DetailView',
    component: DetailView,
  },
  {
    path: '/create',
    name: 'CreateView',
    component: CreateView,
  },
],
})

export default router