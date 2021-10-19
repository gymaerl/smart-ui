<template>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import DialogAddSwiper from '@/components/examples/DialogAddSwiper.vue'
import axios from '@/utils/axios'
export default {
  name: 'Pagination',
  setup() {
    const state = reactive({
      loading: false,
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 分页大小
    })
    onMounted(() => {
      getCarousels()
    })
    const changePage = (val) => {
      state.currentPage = val
      getCarousels()
    }
    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      addGood,
      handleAdd,
      handleEdit,
      handleDelete,
      handleDeleteOne,
      getCarousels,
      changePage
    }
  }
}
</script>

<style scoped>
  .list-container {
    min-height: 100%;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>