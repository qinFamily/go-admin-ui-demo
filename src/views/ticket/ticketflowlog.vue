<template>
  <div class="app-container">
    <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="68px">
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-permisaction="['ticketsticketflowlog:ticketsticketflowlog:add']"
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['ticketsticketflowlog:ticketsticketflowlog:edit']"
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-permisaction="['ticketsticketflowlog:ticketsticketflowlog:remove']"
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
    </el-row>

    <el-table
      v-loading="loading"
      :data="ticketsticketflowlogList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-permisaction="['ticketsticketflowlog:ticketsticketflowlog:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-permisaction="['ticketsticketflowlog:ticketsticketflowlog:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageIndex"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="主键" prop="id">
          <el-input v-model="form.id" placeholder="主键" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="form.createTime" placeholder="创建时间" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-input v-model="form.updateTime" placeholder="更新时间" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" placeholder="备注" />
        </el-form-item>
        <el-form-item label="审批意见" prop="suggestion">
          <el-input v-model="form.suggestion" placeholder="审批意见" />
        </el-form-item>
        <el-form-item label="处理人" prop="participant">
          <el-input v-model="form.participant" placeholder="处理人" />
        </el-form-item>
        <el-form-item
          label="干预类型.0: '转交操作',1: '接单操作',2: '评论操作',3: '删除操作',4: '强制关闭操作',5: '强制修改状态操作',6: '撤回',"
          prop="interveneType"
        >
          <el-input
            v-model="form.interveneType"
            placeholder="干预类型.0: '转交操作',1: '接单操作',2: '评论操作',3: '删除操作',4: '强制关闭操作',5: '强制修改状态操作',6: '撤回',"
          />
        </el-form-item>
        <el-form-item label="创建时间" prop="createdAt">
          <el-input v-model="form.createdAt" placeholder="创建时间" />
        </el-form-item>
        <el-form-item label="更新时间" prop="updatedAt">
          <el-input v-model="form.updatedAt" placeholder="更新时间" />
        </el-form-item>
        <el-form-item label="删除时间" prop="deletedAt">
          <el-input v-model="form.deletedAt" placeholder="删除时间" />
        </el-form-item>
        <el-form-item label="当前状态" prop="stateId">
          <el-input v-model="form.stateId" placeholder="当前状态" />
        </el-form-item>
        <el-form-item label="工单" prop="ticketId">
          <el-input v-model="form.ticketId" placeholder="工单" />
        </el-form-item>
        <el-form-item label="流转" prop="transitionId">
          <el-input v-model="form.transitionId" placeholder="流转" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listTicketsTicketflowlog, getTicketsTicketflowlog, delTicketsTicketflowlog, addTicketsTicketflowlog, updateTicketsTicketflowlog } from '@/api/tickets/ticketflowlog'

export default {
  name: 'Config',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 参数表格数据
      configList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 类型数据字典
      typeOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listTicketsTicketflowlog(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.ticketsticketflowlogList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        createTime: undefined,
        updateTime: undefined,
        memo: undefined,
        suggestion: undefined,
        participant: undefined,
        interveneType: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        stateId: undefined,
        ticketId: undefined,
        transitionId: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加工单流转日志'
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getTicketsTicketflowlog(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改工单流转日志'
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateTicketsTicketflowlog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('修改成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addTicketsTicketflowlog(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess('新增成功')
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = row.id || this.ids
      this.$confirm('是否确认删除编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delTicketsTicketflowlog(Ids)
      }).then(() => {
        this.getList()
        this.msgSuccess('删除成功')
      }).catch(function() { })
    }
  }
}
</script>
