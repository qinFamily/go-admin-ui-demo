<template>
  <div class="node-wrap">
    <NodeWrapBox
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      :node="node"
      @delNode="delNode"
    />
    <AddNodeBtnBox
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
import NodeWrapBox from './node-wrap-box'
import AddNodeBtnBox from './add-node-btn-box'
export default {
  name: 'NodeWrap',
  components: {
    NodeWrapBox,
    AddNodeBtnBox
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
  mounted() {
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
    addnode(node) {
      // console.log('node-wrap 新节点:')
      // console.log(node)
      this.$emit('addnode', node)
    },
    delNode() {
      this.$emit('delNode')
    },
  }
}
</script>
