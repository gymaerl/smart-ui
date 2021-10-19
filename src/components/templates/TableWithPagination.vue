<template>
  <el-card class="list-container">
    <template #header>
      <div class="header">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">增加</el-button>
        <el-popconfirm
          title="确定删除吗？"
          @confirm="handleDelete"
        >
          <template #reference>
            <el-button type="danger" size="small" icon="el-icon-delete">批量删除</el-button>
          </template>
        </el-popconfirm>
      </div>
    </template>
    <el-table
      v-loading="loading"
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <!-- dynamic cols -->
      <template v-for="col in layout.list.cols" :key="col">
        <!-- rich style column -->
        <el-table-column
          :label="col.title"
          :width="col.width">
          <template #default="scope">
            <!-- image column -->
            <img :style="col.style" :src="scope.row[col.name].src" :alt="scope.row[col.name].alt" v-if="col.type == 'img'">
            <!-- link column -->
            <a :target="col.target" :href="scope.row[col.name].href" v-else-if="col.type == 'link'">{{ scope.row[col.name].name }}</a>
            <!-- simple column -->
            <span v-else>{{ scope.row[col.name] }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        label="操作"
        width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.pks)"><i icon="el-icon-edit" />修改</a>
          <el-popconfirm
            title="确定删除吗？"
            @confirm="handleDeleteOne(scope.row.pks)"
          >
            <template #reference>
              <a style="cursor: pointer"><i icon="el-icon-delete" />删除</a>
            </template>
          </el-popconfirm>
          <!-- hidden cols -->
          <div v-for="hdnCol in layout.list.hdnCols" :key="hdnCol">
            <input type="hidden" :name="hdnCol.name" :value="scope.row[hdnCol.name]" />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="changePage"
    />
  </el-card>
  <AddRow ref='addRow' :reload="getTableData" :scene="scene" :type="type" :pks="pks" />
</template>

<script>
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import AddRow from '@/components/templates/AddRow.vue'
import axios from '@/utils/axios'
import { localGet } from '../../utils'
export default {
  name: 'TableWithPagination',
  components: {
    AddRow
  },
  setup() {
    console.log('scene is ' + localGet('scene'))
    console.log('layout metadata is ')
    console.log(localGet('layout'))
    const multipleTable = ref(null)
    const addRow = ref(null)
    const state = reactive({
      loading: false,
      tableData: [], // 数据列表
      multipleSelection: [], // 选中项
      total: 0, // 总条数
      currentPage: 1, // 当前页
      pageSize: 10, // 分页大小
      scene: localGet('scene'),
      layout: localGet('layout')[localGet('scene')],
      type: 'add', // 操作类型
    })
    onMounted(() => {
      getTableData()
    })
    // get table data
    const getTableData = () => {
      state.loading = true
      axios.get(`/${state.scene}/list`, {
        params: {
          pageNumber: state.currentPage || 1,
          pageSize: state.pageSize || 10
        }
      }).then(res => {
        console.log(res)
        state.tableData = res.list
        state.total = res.totalCount
        state.currentPage = res.currPage
        state.loading = false
      })
    }
    // add new row
    const handleAdd = () => {
      state.type = 'add'
      addRow.value.open()
    }
    // edit row
    const handleEdit = (pks) => {
      state.type = 'edit'
      addRow.value.open(pks)
    }
    // select row
    const handleSelectionChange = (val) => {
      state.multipleSelection = val
    }
    // batch delete
    const handleDelete = () => {
      if (!state.multipleSelection.length) {
        ElMessage.error('请选择项')
        return
      }
      axios.delete(`/${state.scene}`, {
        data: {
          pks: state.multipleSelection.map(i => i.pks)
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getTableData()
      })
    }
    // 单个删除
    const handleDeleteOne = (pks) => {
      axios.delete(`/${state.scene}`, {
        data: {
          pks: [pks]
        }
      }).then(() => {
        ElMessage.success('删除成功')
        getTableData()
      })
    }
    const changePage = (val) => {
      state.currentPage = val
      getTableData()
    }
    return {
      ...toRefs(state),
      multipleTable,
      handleSelectionChange,
      addRow,
      handleAdd,
      handleEdit,
      handleDelete,
      handleDeleteOne,
      getTableData,
      changePage
    }
  }
}
</script>

<style scoped>
  .list-container {
    min-height: 100%;
  }
  .list-container img {
    max-width: 100px;
    max-height: 100px;
  }
  .el-card.is-always-shadow {
    min-height: 100%!important;
  }
</style>