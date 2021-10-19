<template>
  <div class="layout" id="menuArea">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside" v-show="state.isCollapse">
        <div class="head">
          <div>
            <img src="/smart-ui.png" alt="Smart UI">
            <span>Smart UI</span>
            &nbsp;&nbsp;<i class="icon el-icon-s-fold" @click="state.isCollapse = !state.isCollapse" />
          </div>
        </div>
        <div class="line" />
        <el-menu
          :default-openeds="state.defaultOpen"
          background-color="#222832"
          text-color="#fff"
          :router="true"
          :default-active='state.currentPath'
        >
          <template v-for="item in state.menus" :key="item">
            <el-submenu :index="item.index">
              <template #title>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="child.index" v-for="child in item.child" :key="child.index">
                  <i :class="child.class" />{{ child.name }}
                </el-menu-item>
            </el-menu-item-group>
            </el-submenu>
          </template>
        </el-menu>
      </el-aside>
      <div v-show="!state.isCollapse" class="head">
        &nbsp;&nbsp;<i class="icon el-icon-s-unfold" @click="state.isCollapse = !state.isCollapse" />
      </div>
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { onUnmounted, reactive } from 'vue'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import { useRouter } from 'vue-router'
import { localGet, localSet } from '@/utils'
import { getRouter } from './router/index'
import axios from '@/utils/axios'


export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  setup() {
    const noMenu = ['/login']
    const router = useRouter()
    const state = reactive({
      defaultOpen: ['1', '2', '3', '4'],
      showMenu: true,
      isCollapse: true,
      menus: localGet('menus'),
      currentPath: '/dashboard',
      count: {
        number: 1
      }
    })
    // 监听浏览器原生回退事件
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener('popstate', () => {
        if (!localGet('token')) {
          state.showMenu = false
        }
      }, false);
    }
    const unwatch = router.beforeEach((to, from, next) => {
      // console.log('token is: ')
      // console.log(localGet('token'))
      // console.log('increamen router apply flag is: ')
      // console.log(localGet('routerApply'))
      
      if(localGet('routerApply') && localGet('token')) {
        getRouter()
      }
      
      console.log(to)
      console.log(localGet('path_map'))
      if (to.path == '/login') {
        // 如果路径是 /login 则正常执行
        next()
      } else if(localGet('path_map') && !localGet('path_map')[to.name]) {
        alert('Invalid router [' + to.name + '], will move to login automatically')
        next({ path: '/login' })
      } else {
        // 如果不是 /login，判断是否有 token
        if (!localGet('token')) {
          // 如果没有，则跳至登录页面
          next({ path: '/login' })
        } else {
          // 否则继续执行
          localSet('scene', to.name)
          next()
        }
      }

      state.showMenu = !noMenu.includes(to.path)
      state.currentPath = to.path
      // document.title = pathMap[to.name]
      if(localGet('path_map')) {
        document.title = localGet('path_map')[to.name]
      }
    })

    onUnmounted(() => {
      unwatch()
    })

    return {
      state
    }
  }
}
</script>

<style scoped>
  .layout {
    min-height: 100vh;
    background-color: #ffffff;
  }
  .container {
    height: 100vh;
  }
  .aside {
    width: 200px!important;
    background-color: #222832;
    overflow: hidden;
    overflow-y: auto;
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
  }
  .aside::-webkit-scrollbar {
    display: none;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
  }
  .head > div {
    display: flex;
    align-items: center;
  }

  .head img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }
  .head span {
    font-size: 20px;
    color: #ffffff;
  }
  .line {
    border-top: 1px solid hsla(0,0%,100%,.05);
    border-bottom: 1px solid rgba(0,0,0,.2);
  }
  .content {
    display: flex;
    flex-direction: column;
    max-height: 100vh;
    overflow: hidden;
  }
  .main {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 10px;
  }
</style>
<style>
  body {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .el-menu {
    border-right: none!important;
  }
  .el-submenu {
    border-top: 1px solid hsla(0, 0%, 100%, .05);
    border-bottom: 1px solid rgba(0, 0, 0, .2);
  }
  .el-submenu:first-child {
    border-top: none;
  }
  .el-submenu [class^="el-icon-"] {
    vertical-align: -1px!important;
  }
  a {
    color: #409eff;
    text-decoration: none;
  }
  .el-pagination {
    text-align: center;
    margin-top: 20px;
  }
  .el-popper__arrow {
    display: none;
  }
</style>
