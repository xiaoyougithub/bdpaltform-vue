import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  //系统后台路由
  {
    path: '/',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "about" */ '../views/manager/layout/Layout'),
    children: [
      {
        path: '/', //二级路由路径以/开头表示从根路径开始
        name: 'index',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/index/Index.vue')
        }
      }, {
        path: '/user', //二级路由路径以/开头表示从根路径开始
        name: 'user',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/user/User.vue')
        }
      },
      {
        path: '/performance/serverA', //二级路由路径以/开头表示从根路径开始
        name: 'ServerA',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/performance/ServerA.vue')
        }
      },
      {
        path: '/performance/serverB', //二级路由路径以/开头表示从根路径开始
        name: 'serverB',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/performance/ServerB.vue')
        }
      },
      {
        path: '/performance/serverC', //二级路由路径以/开头表示从根路径开始
        name: 'serverC',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/performance/ServerC.vue')
        }
      }, {
        path: '/hadoop/zookeeper', //二级路由路径以/开头表示从根路径开始
        name: 'Zookeeper',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/hadoop/Zookeeper.vue')
        }
      }, {
        path: '/hadoop/hdfsCluster', //二级路由路径以/开头表示从根路径开始
        name: 'Hdfs',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/hadoop/HdfsCluster.vue')
        }
      },{
        path: '/fool', //二级路由路径以/开头表示从根路径开始
        name: 'Fool',
        component: function () {
          return import(/* webpackChunkName: "about" */ '@/views/manager/fool/Fool.vue')
        }
      }]
  },
  //about路由，哈哈哈~
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/manager/login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/manager/register/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router