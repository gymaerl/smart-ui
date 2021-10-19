<template>
  <el-card class="account-container">
    <h1>Introduction</h1>
    <div style="line-height: 30px">
      Smart UI is a smart interface system with a complete and independent front end. The front end is developed based on the related technology stack of Vue 3.0, and can be run independently using mock + sample result data (yaml file). <br>
      The complete api interface is associated with the companion, so it has a choice based on the technology stack. <br>
      We will enrich themes and interactive templates at the right time to support the ever-enriching interactive needs (for example: the interactive needs of PCs, pads, smart phones and other devices). <br>
      We will gradually improve various functions and make it an extensible user interface framework. Back-end developers can develop by themselves, provide configuration through the framework, based on templates, and provide front-end services with necessary information.<br>
      This system is based on the secondary development of <a href="https://github.com/zuotaogithub/vue3.x-admin">[zuotaogithub/vue3.x-admin]</a> and respects the ownership of the original.
    </div>
    
    <h1>Features List</h1>
    <ul class="course">
      <li>Done - [auto] Login (password + token)</li>
      <li>Done - Logout</li>
      <li>Modify user info</li>
      <li>Done - Dynamic generate menu</li>
      <li>Done - Dynamic generate router</li>
      <li>No-need - Privilege control (due to backend will return the filtered menu and router data)</li>
      <li>[Done] Dynamic generate page (checkbox need to research)</li>
      <li>Support multiple languages</li>
      <li>Support multiple styles (PC, Pad, Smartphone)</li>
    </ul>
    
    <h1>Todo List</h1>
    <ul class="course">
      <li>Modify user info</li>
      <li>Design backend woth DJango</li>
    </ul>
    
    <h1>Technology stack</h1>
    <ul style="font-weight: bold;">
      <li>Vue 3.x</li>
      <li>Vue-Router 4.x</li>
      <li>Element-Plus(PC-side component library adapted to the new Vue 3.x)</li>
      <li>Echarts 5.0</li>
      <li>axios</li>
      <li>wangEditor</li>
    </ul>
    <h1>Contact the author</h1>
    <ul>
      <li>Email：gymaerl@gmail.com</li>
    </ul>
  </el-card>
</template>

<script>
export default {
  name: 'Introduce',
  setup() {
    const goJuejin = () => {
      console.log('goJuejin')
      window.open('https://juejin.cn/book/6933939264455442444', 'target')
    }

    return {
      goJuejin
    }
  }
}
</script>
<style scoped>
  .course {
    font-weight: bold;
    display: inline-block;
  }
  .course li {
    line-height: 36px;
    color: #409eff;
    cursor: pointer;
  }
</style>