<template>
  <div class="condition-node">
    <ConditionNodeBox
      :node="node"
      @addnode="addnode"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
      @updateCondition="updateCondition"
    />
  </div>
</template>
<script>
import ConditionNodeBox from './condition-node-box'
export default {
  name: 'ConditionNode',
  components: {
    ConditionNodeBox
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    text: {
      type: String,
      default: '请设置条件'
    },
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
      this.$emit('addnode', node)
    },
    delConditionNode() {
      this.$emit('delConditionNode')
    },
    addConditionFactor(node) {
      this.$emit('addConditionFactor', node)
    },
    updateCondition(node) {
      this.$emit('updateCondition', node)
    }
  }
}
</script>
