<template>
  <AModal :dialog.sync="dialog1" @close="cancel">
    <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
      <el-form-item label="审批对象" prop="approve">
        <el-radio-group v-model="formData.approve" @change="prepareOptions" size="medium">
          <el-radio
            v-for="(item, index) in approveOptions"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
            border
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if=" formData.approve == 1 " label="选择主管" prop="manager">
        <el-select
          v-model="formData.manager"
          placeholder="请选择主管"
          multiple
          filterable
          clearable
          :style="{width: '100%'}"
        >
          <el-option
            v-for="(item, index) in managerOptions"
            :key="index"
            :label="item.label"
            :value="item.value"
            :disabled="item.disabled"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if=" formData.approve == 2 " label="选择成员" prop="persons">
        <!-- :options="personsOptions" -->
        <el-cascader
          separator="/"
          v-model="formData.persons"
          :options="deptOptions"
          :props="personsProps"
          :style="{width: '100%'}"
          placeholder="请选择成员"
          filterable
          clearable
        ></el-cascader>
      </el-form-item>
      <el-form-item label="多人审批" prop="approvals">
        <el-radio-group v-model="formData.approvals" size="medium">
          <el-radio
            v-for="(item, index) in approvalsOptions"
            :key="index"
            :label="item.value"
            :disabled="item.disabled"
            border
          >{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer"></div>
    <div class="common-group none-actioner-wrapper">
      <slot name="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </slot>
    </div>
    <div class="common-group none-actioner-wrapper">{{ properties1 }}</div>

    <!--div class="panel-approver">
      <div class="common-group approver-type-wrapper">
        <div class="group-title">选择审批对象</div>
        <div class="group-content">
          <div>
            <div class="ant-radio-group ant-radio-group-outline">
              <label
                v-for="(a, index) in approvers"
                :key="index"
                :class="[currentApp === a.value ? 'ant-radio-wrapper ant-radio-wrapper-checked' : 'ant-radio-wrapper']"
                @click="setApprover(a)"
              >
                <span
                  :class="[currentApp === a.value ? 'ant-radio ant-radio-checked' : 'ant-radio']"
                >
                  <input type="radio" class="ant-radio-input" :value="a.value" />
                  <span class="ant-radio-inner" />
                </span>
                <span>{{ a.label }}</span>
              </label>
            </div>
          </div>
          <div v-if="currentApp === 'target_label' && !showAddRole" class="approver-actions">
            <button
              type="button"
              class="ant-btn ant-btn-primary"
              ant-click-animating-without-extra-node="false"
              @click="addRole"
            >
              <i
                aria-label="icon: plus"
                class="anticon anticon-plus"
                style="color: rgb(255, 255, 255);"
              >
                <svg
                  viewBox="64 64 896 896"
                  focusable="false"
                  class
                  data-icon="plus"
                  width="1em"
                  height="1em"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z" />
                  <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z" />
                </svg>
              </i>
              <span>添加角色</span>
            </button>
          </div>
          <div
            v-if="showAddRole"
            class="ant-row-flex ant-row-flex-space-around ant-row-flex-middle condition-group"
          >
            角色名&nbsp;&nbsp;
            <div class="ant-select ant-select-enabled" style="min-width: 150px;">
              <div class="ant-input-number-input-wrap">
                <input
                  v-model="properties1.actionerRules[0].labelNames"
                  class="ant-input-number-input"
                  placeholder="输入角色名"
                />
              </div>
            </div>
          </div>
          <div v-if="currentApp === 'target_management'" class="approver-actions">
            发起人的&nbsp;&nbsp;
            <div class="ant-select ant-select-enabled" style="min-width: 150px;">
              <div
                class="ant-select-selection ant-select-selection--single"
                aria-expanded="false"
                tabindex="0"
              >
                <div
                  class="ant-select-selection__rendered"
                  data-spm-anchor-id="0.0.0.i263.2f244490UdKR44"
                >
                  <div
                    class="ant-select-selection-selected-value"
                    title="直接主管1"
                    style="display: block; opacity: 1;"
                    data-spm-anchor-id="0.0.0.i265.2f244490UdKR44"
                  >直接主管2</div>
                </div>
              </div>
            </div>
            <div class="area-auto-up" />
          </div>
        </div>
      </div>
      <div class="common-group area-act-type-wrapper">
        <div class="group-title">
          <div>多人审批时采用的审批方式</div>
        </div>
        <div class="group-content">
          <div class="ant-radio-group ant-radio-group-outline">
            <label
              v-for="(a, i) in actTypes"
              :key="i"
              :class="[currentAction === a.value ? 'ant-radio-wrapper ant-radio-wrapper-checked' : 'ant-radio-wrapper']"
              @click="setAction(a)"
            >
              <span
                :class="[currentAction === a.value ? 'ant-radio ant-radio-checked' : 'ant-radio']"
              >
                <input type="radio" class="ant-radio-input" :value="a.value" />
                <span class="ant-radio-inner" />
              </span>
              <span>{{ a.label }}</span>
            </label>
          </div>
        </div>
      </div>
    </div-->
  </AModal>
</template>
<script>
import AModal from './../AModal/AModal'
export default {
  inheritAttrs: false,
  components: {
    AModal
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    properties: {
      type: Object,
      default: () => {
        actionerRules: [{
          type: 'target_management',
          level: 1,
          isEmpty: false,
          autoUp: true,
          actType: 'or'
        }]
      },
    },
    approvers: {
      type: Array,
      default: () => [
        { label: '主管', value: 'target_management', color: 'red' },
        { label: '角色', value: 'target_label', color: 'green' }
      ]
    },
    actTypes: {
      type: Array,
      default: () => [
        { label: '或签（一名审批人同意或拒绝即可）', value: 'or', color: 'red' },
        { label: '会签（须所有审批人同意）', value: 'and', color: 'green' }
      ]
    },
    // 用户表格数据
    userList: {
      type: Array,
      default: () => [],
    },
    // 状态数据字典
    statusOptions: {
      type: Array,
      default: () => [],
    },
    // 岗位选项
    postOptions: {
      type: Array,
      default: () => [],
    },
    // 角色选项
    roleOptions: {
      type: Array,
      default: () => [],
    },
    // 部门选项
    deptOptions: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    dialog1: false,
    showAddRole: false,
    currentApp: 'target_management',
    currentAction: 'or',
    temp: {},
    properties1: {},
    formData: {
      approve: undefined,
      manager: [],
      persons: [],
      approvals: undefined,
    },
    rules: {
      approve: [{
        required: true,
        message: '审批对象不能为空',
        trigger: 'change'
      }],
      manager: [{
        required: true,
        type: 'array',
        message: '请至少选择一个manager',
        trigger: 'change'
      }],
      persons: [{
        required: true,
        type: 'array',
        message: '请至少选择一个persons',
        trigger: 'change'
      }],
      approvals: [{
        required: true,
        message: '多人审批不能为空',
        trigger: 'change'
      }],
    },
    approveOptions: [{
      "label": "主管",
      "value": 1
    }, {
      "label": "成员",
      "value": 2
    }],
    managerOptions: [{
      "label": "直属主管",
      "value": 1
    }, {
      "label": "二级主管",
      "value": 2
    }, {
      "label": "三级主管",
      "value": ""
    }],
    personsOptions: [
      {
        "id": 1,
        "value": 1,
        "label": "公共",
        "persons": [{
          "id": 2,
          "value": 2,
          "label": "硼烷"
        }, {
          "label": "牛栏",
          "value": 3,
          "id": 3
        }]
      }
    ],
    approvalsOptions: [{
      "label": "或签（任一通过则通过）",
      "value": 1
    }, {
      "label": "会签（所有通过则通过）",
      "value": 2
    }],
    personsProps: {
      "multiple": true,
      "value": "deptId",
      "label": "deptName",
      "children": "children"
    },
    // personsProps: {
    //   "multiple": true,
    //   "value": "value",
    //   "label": "label",
    //   "children": "persons"
    // },
  }),
  watch: {
    'dialog'(val) {
      this.dialog1 = val
    },
    dialog1(val) {
      this.$emit('update:dialog', val)
    },
    userList(newV, oldV) {
      this.userList = newV
    },
    statusOptions(v) {
      this.statusOptions = v
    },
    postOptions(v) {
      this.postOptions = v
    },
    roleOptions(v) {
      this.roleOptions = v
    },
    deptOptions(v, vo) {
      this.deptOptions = v
    },
  },
  mounted() {
    this.properties1 = this.properties
    this.init()
    Object.assign(this.temp, this.properties1)
  },
  created() {
    this.formData.approve = 1
    this.formData.approvals = 1
  },
  methods: {
    init() {
      this.properties1 = this.properties1 ? this.properties1 : {
        actionerRules: [
          {
            type: 'target_management',
            level: 1,
            isEmpty: false,
            autoUp: true,
            actType: 'or'
          }
        ]
      }
      var rule = this.properties1.actionerRules && this.properties1.actionerRules[0]
      if (rule) {
        this.currentApp = rule.type
        this.currentAction = rule.actType
        if (rule.labelNames) this.showAddRole = true
      }
    },
    save() {
      var rule = this.properties1.actionerRules[0]
      switch (rule.type) {
        case 'target_label':
          if (!rule.labelNames || rule.labelNames === '') {
            alert('角色不能为空')
            return
          }
          break
      }
      this.dialog1 = false
      Object.assign(this.temp, this.properties1)
      this.$emit('setProperties', this.properties1)
    },
    cancel() {
      this.dialog1 = false
      this.properties1 = {}
      Object.assign(this.properties1, this.temp)
      this.init()
      this.$emit('setProperties', this.properties1)
    },
    setApprover(app) {
      this.currentApp = app.value
      if (app.value === 'target_label') {

      } else {
        this.showAddRole = false
      }
      this.properties1.actionerRules = []
      switch (app.value) {
        case 'target_management':
          this.properties1.actionerRules.push({
            type: 'target_management',
            level: 1,
            isEmpty: false,
            autoUp: true
          })
          break
        case 'target_label':
          this.properties1.actionerRules.push({
            type: 'target_label',
            labelNames: '',
            labels: '',
            isEmpty: false,
            memberCount: 1,
            actType: 'or'
          })
          break
        default:
      }
    },
    setAction(act) {
      this.currentAction = act.value
      this.properties1.actionerRules[0].actType = act.value
    },
    addRole() {
      this.showAddRole = true
    },

    close() {
      this.dialog1 = false
      this.properties1 = {}
      Object.assign(this.properties1, this.temp)
      this.$refs['elForm'].resetFields()
      this.init()
      this.$refs['elForm'].resetFields()
      this.$emit('setProperties', this.properties1)
      this.$emit('update:visible', false)
      this.$refs['elForm'].resetFields()
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
      console.log("here!!!!!")
      var rule = this.properties1.actionerRules[0]
      // this.dialog1 = false
      Object.assign(this.temp, this.properties1)
      this.$emit('setProperties', this.properties1)
    },
    getPersonsOptions() {
      // TODO 发起请求获取数据
      return this.$parent.getPersonsOptions()
    },
    containsDept(array, obj) {
      for (var i = 0; i < array.length; i++) {
        if (array[i].deptId === obj.deptId) {
          return true;
        }
      }
      return false;
    },
    digui(deptOptions) {
      for (var p in this.userList) {
        for (var d in deptOptions) {
          // console.log("deptOptions[d]", d, deptOptions[d], "userList[p]", p, this.userList[p].deptId)
          if (deptOptions[d] && deptOptions[d].deptId == this.userList[p].deptId) {
            if (deptOptions[d].children) {
              var children = {
                "deptId": this.userList[p].userId,
                "deptName": this.userList[p].nickName,
              }
              if (!this.containsDept(deptOptions[d].children, children)) {
                deptOptions[d].children.push(children)
              }
            }
          }
          // console.log("deptOptions[d].children", deptOptions[d].children)
          if (deptOptions[d].children) {
            this.digui(deptOptions[d].children)
            // for (var c in deptOptions[d].children) {
            //   // 递归 TODO
            //   console.log("digui", c, deptOptions[d].children[c])
            //   this.digui(deptOptions[d].children[c])
            // }
          }
        }
      }
    },
    prepareOptions() {
      console.log("formData.approve", this.formData.approve)
      if (this.formData.approve == 2) {
        this.digui(this.deptOptions)

        // console.log("deptOptions", JSON.stringify(this.deptOptions, null, 4))
      }
    },
  }
}
</script>
