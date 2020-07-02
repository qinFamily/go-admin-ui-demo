<template>
  <div class="add-node-btn">
    <button class="btn" type="button" @click="click">
      <span class="iconfont">
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
            d="M810.666667 554.666667h-256v256h-85.333334v-256H213.333333v-85.333334h256V213.333333h85.333334v256h256v85.333334z"
          />
        </svg>
      </span>
    </button>
    <AddNodeDialog
      :dialog.sync="dialog"
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      :node="node"
      @addnode="addnode"
    />
  </div>
</template>
<script>
import AddNodeDialog from './add-node-dialog'
export default {
  name: 'AddNodeBtn',
  components: {
    AddNodeDialog
  },
  props: {
    node: {
      type: Object,
      default: undefined
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
    dialog: false
  }),
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
    click() {
      this.dialog = true
    },
    addnode(node) {
      // console.log('add-node-btn 新添加的节点:')
      // console.log(node)
      this.$emit('addnode', node)
    }
  }
}
</script>
