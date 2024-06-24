import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizParent from '@/components/quizApp/QuizParent.vue'
import TodoParent from '@/components/todo/TodoParent.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  } , {
    path: '/quiz',
    name: 'quiz',
    component: QuizParent
  } , {
    path: '/todo',
    name: 'todo',
    component: TodoParent
  }
  
]

const router = new VueRouter({
  routes
})

export default router
