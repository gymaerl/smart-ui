<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <img src="/smart-ui.png" alt="Smart UI">
        <div class="name">
          <div class="title">Smart UI</div>
          <div class="tips">Produced by Vue3.x</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="User Name" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">Login means you have agreed to <a>"Terms of Service"</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm">Login</el-button>
          <el-checkbox v-model="checked" @change="!checked">Auto-login next time</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from '@/utils/axios'
import md5 from 'js-md5'
import { reactive, ref, toRefs } from 'vue'
import { localSet } from '@/utils'
export default {
  name: 'Login',
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      ruleForm: {
        username: '',
        password: ''
      },
      checked: true,
      rules: {
        username: [
          { required: 'true', message: 'User name is required', trigger: 'blur' }
        ],
        password: [
          { required: 'true', message: 'Password is required', trigger: 'blur' }
        ]
      }
    })
    const submitForm = async () => {
      loginForm.value.validate((valid) => {
        console.log('valid: ' + valid)
        if (valid) {
          axios.post('/adminUser/login', {
            userName: state.ruleForm.username || '',
            passwordMd5: md5(state.ruleForm.password)
          }).then(res => {
            console.log('login response: ')
            console.log(res)
            localSet('token', res.user.token)
            localSet('user', res.user)
            localSet('routers', res.routers)
            localSet('menus', res.menus)
            localSet('path_map', res.path_map)
            localSet('routerApply', true)
            localSet('layout', res.layout)
            
            window.location.href = '/'
          }).catch(err => {
            console.log('login error: ')
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false;
        }
      })
    }
    const resetForm = () => {
      loginForm.value.resetFields();
    }
    return {
      ...toRefs(state),
      loginForm,
      submitForm,
      resetForm
    }
  }
}
</script>

<style scoped>
  .login-body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: #fff;
    /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
  }
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
  }
  .head {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0 20px 0;
  }
  .head img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  .head .title {
    font-size: 28px;
    color: #1BAEAE;
    font-weight: bold;
  }
  .head .tips {
    font-size: 12px;
    color: #999;
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
</style>
<style>
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .login-form .el-form-item {
    margin-bottom: 12px;
  }
</style>