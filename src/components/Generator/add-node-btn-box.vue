<template>
  <div class="add-node-btn-box">
    <AddNodeBtn
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
import AddNodeBtn from './add-node-btn'
export default {
  name: 'AddNodeBtnBox',
  components: {
    AddNodeBtn
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
    addnode(node) {
      // console.log('add-node-btn-box 新结节')
      // console.log(node)
      this.$emit('addnode', node)
    }
  }
}
</script>
