<template>
  <div>
    <NodeWrap
      v-if="node.type == 'start' || node.type == 'approver' || node.type == 'notifier'"
      :node="node"
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      @addnode="addnode"
      @delNode="delNode"
    />
    <ConditionNode
      v-if="node.type == 'condition'"
      :node.sync="node"
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
    <BranchWrap
      v-if="node.type == 'route'"
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      :node="node"
      @addnode="addnode"
      @delNode="delNode"
    />
  </div>
</template>
<script>
import NodeWrap from './node-wrap'
import ConditionNode from './condition-node'
import BranchWrap from './branch-wrap'
export default {
  name: 'Node',
  components: {
    NodeWrap,
    BranchWrap,
    ConditionNode
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
      // console.log('node 新节点:')
      // console.log(node)
      this.$emit('addnode', node)
    },
    delNode() {
      this.$emit('delNode')
    },
    delConditionNode() {
      this.$emit('delConditionNode')
    },
    addConditionFactor(node) {
      this.$emit('addConditionFactor', node)
      this.node = node
      // console.log(this.node)
    },
  }
}
</script>
