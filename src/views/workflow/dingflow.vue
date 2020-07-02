<template>
  <div>
    <el-form ref="elForm" :model="formData" :rules="rules" size="mini" label-width="100px">
      <el-row :gutter="15" align="bottom">
        <!-- type="flex" -->
        <el-col :span="4">
          <el-form-item class="grid-content bg-purple" label="流程类型" prop="flowtype">
            <el-select
              v-model="formData.flowtype"
              placeholder="请选择流程类型"
              filterable
              clearable
              :style="{width: '100%'}"
            >
              <el-option
                v-for="(item, index) in flowtypeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
                :disabled="item.disabled"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <div>&nbsp;</div>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" round @click="preview">预 览</el-button>
          <el-button type="success" round @click="preview">发 布</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row :gutter="15">
      <div class="fd-nav-content">
        <div class="dingflow-design">
          <!--div class="zoom">
            <div class="zoom-out" />
            <span>100%</span>
            <div class="zoom-in" />
          </div-->
          <div class="ie-polyfill-container">
            <div
              id="box-scale"
              :key="key"
              class="box-scale"
              style="transform: scale(1); transform-origin: 50% 0px 0px;"
            >
              <Node
                v-for="(item, index) in items"
                :key="index"
                :node="item"
                :userList="userList"
                :deptOptions="deptOptions"
                @addnode="addnode"
                @delNode="delNode(item)"
              />
              <EndNode />
              <AModal :dialog.sync="viewModal">
                <pre
                  style="font-family: Monaco,Menlo,Consolas,Bitstream Vera Sans Mono,monospace;font-size: 14px;"
                >{{ JSON.stringify(data1.node, null, 4) }}</pre>
              </AModal>
              <ErrorsModal :dialog.sync="errorsModal" :data="errors" />
            </div>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>


<script>

import { listUser, getUser, delUser, addUser, updateUser, exportUser, resetUserPwd, changeUserStatus, importTemplate, getUserInit } from '@/api/system/sysuser'
import { getToken } from '@/utils/auth'
import { treeselect } from '@/api/system/dept'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import AModal from '@/components/AModal/AModal'
import EndNode from '@/components/Generator/end-node'
import ErrorsModal from '@/components/Generator/errors-modal'
import { iteratorData, addNewNode, delNode, checkData } from '@/components/Generator/process'

// import Main from '@/components/Generator'
import '@/assets/style.css'
export default {
  name: 'DingWorkflowUi',
  components: {
    EndNode,
    AModal,
    ErrorsModal,
    Treeselect
  },
  data() {
    return {
      items: [],
      key: 0,
      errorsModal: false,
      errors: [],
      viewModal: false,
      data1: {
        title: '请假',
        node: {
          name: '发起人',
          type: 'start',
          nodeId: 'sid-startevent',
          childNode: {}
        }
      },

      formData: {
        flowtype: undefined,
      },
      rules: {
        flowtype: [{
          required: true,
          message: '请选择流程类型',
          trigger: 'change'
        }],
        username: [
          { required: true, message: '用户名称不能为空', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '用户昵称不能为空', trigger: 'blur' }
        ],
        deptId: [
          { required: true, message: '归属部门不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '用户密码不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱地址不能为空', trigger: 'blur' },
          {
            type: 'email',
            message: "'请输入正确的邮箱地址",
            trigger: ['blur', 'change']
          }
        ],
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '请输入正确的手机号码',
            trigger: 'blur'
          }
        ],
      },
      flowtypeOptions: [{
        "label": "请假",
        "value": 1
      }, {
        "label": "开发",
        "value": 2
      }, {
        "label": "盖章",
        "value": "3"
      }, {
        "label": "其他",
        "value": "4"
      }],

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
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: '',
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 岗位选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 部门选项
      deptOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: 'children',
        label: 'deptName'
      },
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        username: undefined,
        phone: undefined,
        status: undefined,
        deptId: undefined
      },
    }
  },
  watch: {
    data: {
      handler(val) {
        this.data1 = val
      },
      deep: true
    },
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    if (this.data && this.data.node) {
      this.data1 = this.data
    }
    if (!this.data1.node) {
      this.initialNode()
    }
    this.iteratorData(this.data1.node)
  },
  created() {
    this.getList()
    this.getTreeselect()
    this.getDicts('sys_normal_disable').then(response => {
      this.statusOptions = response.data
    })
    this.getDicts('sys_user_sex').then(response => {
      this.sexOptions = response.data
    })
    this.getConfigKey('sys.user.initPassword').then(response => {
      this.initPassword = response.msg
    })
  },
  methods: {
    ok(data) {
      console.log(data)
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    initialNode() {
      this.data1.node = {
        name: '发起人',
        type: 'start',
        nodeId: 'sid-startevent'
      }
    },
    iteratorData(data) {
      this.items = []
      iteratorData(this.items, data)
    },
    addnode(node) {
      // console.log('添加节点:' + node.nodeId, JSON.stringify(this.data1.node, null, 4), JSON.stringify(this.items, null, 4))
      addNewNode(node, this.data1.node, this.items)
      // console.log('添加节点后:', JSON.stringify(this.data1.node, null, 4), JSON.stringify(this.items, null, 4))
      this.key++
    },
    delNode(node) {
      // console.log('删除节点:' + node.properties.actionerRules[0].labelNames)
      delNode(node, this.data1.node, this.items)
      // this.iteratorData(this.data1.node)
      // console.log(this.data1.node)
      // console.log(this.items)
      this.key++
    },
    save() {
      var errors = checkData(this.data1.node)
      if (errors.length > 0) {
        this.errorsModal = true
        this.errors = errors
        return
      }
      // 子组件向父组件传递 ok， 父组件调用子组件的时候用 @ok="okfn" 监听子组件的$emit('ok', this.data1)， 第一个参数是事件，第二个参数是数据
      this.$emit('ok', this.data1)
      console.log("dingflow save", this.data1)
    },
    preview() {
      var errors = checkData(this.data1.node)
      if (errors.length > 0) {
        this.errorsModal = true
        this.errors = errors
        return
      }
      this.viewModal = true
    },

    /** 查询用户列表 */
    getList() {
      this.loading = true
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        // console.log("getList response", response)
        this.userList = response.data.list
        // console.log("listUser", this.userList)
        this.total = response.data.count
        this.loading = false
      })
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        // console.log("treeselect response", JSON.stringify(response, null, 4))
        this.deptOptions = response.data
      })
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.deptId
      this.getList()
    },
    /** 转换菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      }
    },
    // 用户状态修改
    handleStatusChange(row) {
      const text = row.status === '0' ? '启用' : '停用'
      this.$confirm('确认要"' + text + '""' + row.username + '"用户吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function () {
        return changeUserStatus(row.userId, row.status)
      }).then(() => {
        this.msgSuccess(text + '成功')
      }).catch(function () {
        row.status = row.status === '0' ? '1' : '0'
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        username: undefined,
        nickName: undefined,
        password: undefined,
        phone: undefined,
        email: undefined,
        sex: undefined,
        status: '0',
        remark: undefined,
        postIds: undefined,
        roleIds: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    getPersonsOptions() {
      // TODO 发起请求获取数据
      return this.userList
    },
  }
}
</script>

<style scoped>
</style>