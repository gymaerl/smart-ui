<template>
  <el-dialog
    :title="type == 'add' ? '添加' + scene : '修改' + scene"
    v-model="visible"
    width="400px"
    @close="handleClose"
  >
    <el-form :model="detailForm" :rules="rules" ref="formRef" label-width="100px" class="detailForm">
      <!-- dynamic items -->
      <template v-for="item in layout.detail.cols" :key="item">
        <el-form-item :required="item.required" :label="item.label" :prop="item.name" label-width="160px">
          <!-- image upload item -->
          <el-upload
            v-if="item.type == 'img'"
            class="avatar-uploader"
            :action="uploadImgServer"
            accept="jpg,jpeg,png"
            :headers="{
              token: token
            }"
            :show-file-list="false"
            :before-upload="handleBeforeUpload"
            :on-success="handleUrlSuccess"
          >
            <img :style="item.style" v-if="detailForm[item.name]" :src="detailForm[item.name]" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- textbox item (text) -->
          <el-input v-else-if="item.type == 'text'" type="text" v-model="detailForm[item.name]" :style="item.style" :placeholder="item.placeholder"></el-input>
          <!-- textbox item (number) -->
          <el-input v-else-if="item.type == 'number'" type="number" v-model="detailForm[item.name]" 
            :placeholder="item.placeholder" 
            :min="item.min"
            :max="item.max"
            :precision="item.precision"
            :step="item.step" 
          ></el-input>
          <!-- select item -->
          <el-select v-else-if="item.type == 'select'" v-model="detailForm[item.name]" :style="item.style" 
            clearable :placeholder="item.placeholder"
          >
            <el-option
              v-for="optSelect in item.opts"
              :key="optSelect.value"
              :label="optSelect.label"
              :value="optSelect.value"
            >
            </el-option>
          </el-select>
          <!-- multiple select item -->
          <el-select v-else-if="item.type == 'multi_select'" v-model="detailForm[item.name]" :style="item.style" 
            clearable multiple :placeholder="item.placeholder"
          >
            <el-option
              v-for="optSelect in item.opts"
              :key="optSelect.value"
              :label="optSelect.label"
              :value="optSelect.value"
            >
            </el-option>
          </el-select>
          <!-- textarea item -->
          <el-input v-else-if="item.type == 'textarea'" :style="item.style" type="textarea" v-model="detailForm[item.name]" :placeholder="item.placeholder"></el-input>
          <!-- radio item -->
          <el-radio-group v-else-if="item.type == 'radio'" v-model="detailForm[item.name]" v-for="optRadio in item.opts" :key="optRadio">
            <el-radio :label="optRadio">{{ optRadio }}&nbsp;&nbsp;&nbsp;&nbsp;</el-radio>
          </el-radio-group>
          <!-- checkbox item -->
          <template v-else-if="item.type == 'checkbox'">
            <el-checkbox-group v-model="detailForm[item.name]" 
              v-for="optCheckbox in item.opts" :key="optCheckbox" 
            >
              <el-checkbox :label="optCheckbox"></el-checkbox>
            </el-checkbox-group>
          </template>
          <!-- button item -->
          <el-button v-else-if="item.type == 'button'" type="primary" @click="handleClickButton()">{{ detailForm[item.name] }}</el-button>
          <!-- hidden item -->
          <el-input v-else-if="item.type == 'hidden'" type="hidden" v-model="detailForm[item.name]"></el-input>
          <!-- readonly item -->
          <span v-else :style="item.style">{{ detailForm[item.name] }}</span>
        </el-form-item>
      </template>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">{{ pks ? '立即修改' : '立即创建' }}</el-button>
      </span>
    </template>
    <template>
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="Option A" />
        <el-checkbox label="Option B" />
        <el-checkbox label="Option C" />
        <el-checkbox label="disabled" disabled />
        <el-checkbox label="selected and disabled" disabled />
      </el-checkbox-group>
    </template>
  </el-dialog>
</template>

<script>
import { reactive, ref, toRefs, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import axios from '@/utils/axios'
import { localGet, uploadImgServer, hasEmoji } from '@/utils'
import { ElMessage } from 'element-plus'

export default {
  name: 'AddRow',
  props: {
    scene: String,
    type: String,
    reload: Function
  },
  setup(props) {
    const formRef = ref(null)
    const state = reactive({
      uploadImgServer,
      token: localGet('token') || '',
      visible: false,
      layout: localGet('layout')[props.scene],
      detailForm: localGet('layout')[props.scene].detail.init,
      rules: localGet('layout')[props.scene].detail.rules,
      pks: ''
    })
    // 获取详情
    const getDetail = (pks) => {
      axios.get(`/${props.scene}`, {
        params: {
          pks: pks
        }
      }).then(res => {
        state.detailForm = res
      })
    }
    const handleBeforeUpload = (file) => {
      const sufix = file.name.split('.')[1] || ''
      if (!['jpg', 'jpeg', 'png'].includes(sufix)) {
        ElMessage.error('请上传 jpg、jpeg、png 格式的图片')
        return false
      }
    }
    // 上传图片
    const handleUrlSuccess = (val) => {
      state.detailForm.url = val.data || ''
    }
    // 开启弹窗
    const open = (pks) => {
      state.visible = true
      console.log(state.layout)
      if (pks) {
        state.pks = pks
        getDetail(pks)
      } else {
        state.detailForm = state.layout.detail.init
      }
    }
    // 关闭弹窗
    const close = () => {
      state.visible = false
    }
    const handleClose = () => {
      formRef.value.resetFields()
    }
    const submitForm = () => {
      console.log(formRef.value.validate)
      formRef.value.validate((valid) => {
        if (valid) {
          /* todo: client complex valid check
          if (hasEmoji(state.detailForm.link)) {
            ElMessage.error('不要输入表情包，再输入就打死你个龟孙儿~')
            return
          }
          */
          if (props.type == 'add') {
            axios.post(`/${props.scene}`, state.detailForm).then(() => {
              ElMessage.success('添加成功')
              state.visible = false
              if (props.reload) props.reload()
            })
          } else {
            axios.put(`/${props.scene}`, state.detailForm).then(() => {
              ElMessage.success('修改成功')
              state.visible = false
              if (props.reload) props.reload()
            })
          }
        }
      })
    }
    const handleClickButton = () => {
      // todo: customize dropdown list onchange logic
      alert('button clicked')
    }
    const checkList = ref(['selected and disabled', 'Option A'])
    return {
      ...toRefs(state),
      open,
      close,
      formRef,
      handleClickButton,
      handleBeforeUpload,
      handleUrlSuccess,
      submitForm,
      handleClose,
      checkList
    }
  }
}
</script>

<style scoped>
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }

</style>