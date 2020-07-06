<template>
  <div
    :class="[node.type === 'start' ? 'node-wrap-box node_sid-startevent start-node' : 'node-wrap-box']"
  >
    <div>
      <div class="title" data-spm-anchor-id="0.0.0.i2.2f244490ZxXSWD" :style="titlebg">
        <span class="iconfont">
          <!--svg
            class
            viewBox="64 64 896 896"
            fill="currentColor"
            aria-hidden="true"
            width="1em"
            height="1em"
          >
            <path :d="icon" />
          </svg-->
          <svg-icon :icon-class="iconclass" />
        </span>
        <span class="editable-title" data-spm-anchor-id="0.0.0.i53.2f244490UdKR44">{{ nodetype }}</span>
        <i
          aria-label="icon: close"
          tabindex="-1"
          v-show=" nodetype != '发起人' "
          class="anticon anticon-close close"
          @click="delNode"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            class
            data-icon="close"
            width="1em"
            height="1em"
            fill="currentColor"
          >
            <path
              d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"
            />
          </svg>
        </i>
      </div>
      <div class="content" @click="dialog = true">
        <div class="text">{{ content }}</div>
        <i aria-label="icon: right" class="anticon anticon-right arrow">
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            class
            data-icon="right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 0 0 0-50.4z"
            />
          </svg>
        </i>
      </div>
    </div>
    <AddNodeApprover
      :userList="userList"
      :deptOptions="deptOptions"
      :dialog.sync="dialog"
      :properties="node.properties"
      @setProperties="setProperties"
    />
  </div>
</template>
<script>
import AddNodeApprover from './add-node-approver'
export default {
  name: 'NodeWrapBox',
  components: {
    AddNodeApprover
  },
  props: {
    node: {
      type: Object,
      default: Object
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
    dialog: false,
    text: '请选择',
    titlebg: 'background: rgb(24, 144, 230);',
    nodetype: '发起人',
    content: '选择审批人',
    iconclass: "group",
    icon: 'M857.38719 501.122873l32.092376 55.372292-462.704913 268.054249-32.092376-55.372292 462.704913-268.054249zM214.687739 272.628103a74.666667 74.666667 0 0 1 56.108377-10.59344l349.700121 72.962378 25.42413-16.550783a256 256 0 0 1 200.607216-34.234109l7.340895 1.920136 33.304979 9.173915a62.784 62.784 0 0 1 17.808365 112.93566l-3.142878 1.93771-565.500618 326.294865a64 64 0 0 1-62.81291 0.644848l-3.608286-2.153736-116.500307-74.381783a51.178667 51.178667 0 0 1-5.80794-81.95298l2.726317-2.189881 40.021527-29.880682a64 64 0 0 1 38.67169-12.720002l4.636771 0.180458L306.447943 539.764106l63.58375-41.464382-183.853702-86.16662a66.282667 66.282667 0 0 1-33.502513-84.438721l1.602898-3.709032a66.282667 66.282667 0 0 1 23.743377-27.355265zM228.654476 597.832534l-25.165422 18.790878 100.878414 64.433205 562.921897-324.830673-30.46755-8.398012a192 192 0 0 0-155.943322 24.212909L323.148023 605.254826l-94.493547-7.422292zM249.719766 326.18002l-36.695129 23.994174a2.282667 2.282667 0 0 0 0.277033 3.978501l219.777991 102.991981 111.431983-72.636812-286.786137-59.821493a10.666667 10.666667 0 0 0-6.543342 0.698599L249.719766 326.18002z'
  }),
  mounted() {
    this.setText()
  },
  watch: {
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
  methods: {
    delNode() {
      if (this.nodetype != '发起人') {
        this.$emit('delNode')
      } else {
        console.log("发起人节点不能删除")
      }

    },
    addApprover() {
      this.dialog = true
    },
    setProperties(properties) {
      this.node.properties = properties
      this.setText()
    },
    setText() {
      switch (this.node.type) {
        case 'start':
          this.content = '所有人'
          break
        case 'approver':
          this.nodetype = '审批人'
          this.titlebg = 'background: rgb(255, 148, 62);'
          this.iconclass = 'approval'
          break
        case 'notifier':
          this.nodetype = '抄送人'
          this.titlebg = 'background: rgb(50, 150, 250)'
          this.iconclass = 'cc'
          break
        default:
      }
      if (this.node.properties && this.node.properties.actionerRules) {
        var acr = this.node.properties.actionerRules[0]
        switch (acr.type) {
          case 'target_management':
            this.content = '直接主管'
            this.iconclass = 'supervisor'
            break
          case 'target_approval':
            this.content = ''
            for (var i = 0; i < acr.approvals.length; i++) {
              this.content += acr.approvals[i].userName + '、'
            }
            this.content = this.content.substr(0, this.content.length - 1)
            break
          case 'target_label':
            this.nodetype = acr.labelNames
            this.content = acr.labelNames
            this.iconclass = 'label'
            if (this.node.type === 'approver') this.content += acr.actType === 'and' ? '会签' : '或签'
            break
          default:
        }
      }
    },
  }
}
</script>
