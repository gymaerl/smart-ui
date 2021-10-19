import { createRouter, createWebHashHistory } from 'vue-router'
import { localGet, localSet } from '@/utils'

function genRouter(data) {
  var obj = []
  data.forEach(element => {
    // console.log(element)
    var elObj = { name: element.name, path: element.path }
    if (element.component !== undefined) {
      elObj.component = () => import(element.component)
    }
    if(element.children !== undefined) {
      elObj.children = genRouter(element.children)
    }
    obj.push(elObj)
  })
  return obj
}

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  routes: [
    {
      path: '/',
      redirect: '/introduce'
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: () => import(/* webpackChunkName: "introduce" */ '../views/Introduce.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/Index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import(/* webpackChunkName: "account" */ '../views/sys-mgmt/Account.vue')
    }
  ]
})

export default router

export function getRouter() {
    const routerObj = genRouter(localGet('routers'))
    // console.log(routerObj)
    routerObj.forEach(element => {
      router.addRoute(element)
    });
    localSet('routerApply', false)
    // console.log('increamen router apply flag is: ')
    // console.log(localGet('routerApply'))
}
