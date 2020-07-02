<template>
  <div :key="key" class="col-box">
    <div v-if="pos == 0" class="top-left-cover-line" />
    <div v-if="pos == 0" class="bottom-left-cover-line" />
    <div v-if="pos == (total-1)" class="top-right-cover-line" />
    <div v-if="pos == (total-1)" class="bottom-right-cover-line" />
    <Node
      v-for="(item, index) in items"
      :key="index"
      :node="item"
      :userList="userList"
      :statusOptions="statusOptions"
      :postOptions="postOptions"
      :roleOptions="roleOptions"
      :deptOptions="deptOptions"
      @addnode="addnode"
      @delNode="delNode(item)"
      @delConditionNode="delConditionNode"
      @addConditionFactor="addConditionFactor"
    />
  </div>
</template>
<script>
import { iteratorData, addNewNode, delNode } from './process'
export default {
  name: 'ColBox',
  props: {
    node: {
      type: Object,
      default: undefined
    },
    total: {
      type: Number,
      default: 0
    },
    pos: {
      type: Number,
      default: 0
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
    items: [],
    // 用于强制刷新
    key: 0,
    node1: null
  }),
  watch: {
    node: {
      handler(val) {
        // console.log(val)
        if (val) {
          this.getData(val)
          this.node1 = val
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.node) {
      this.getData(this.node)
      this.node1 = this.node
    }
  },
  methods: {
    getData(data) {
      this.items = []
      iteratorData(this.items, data)
    },
    addnode(node) {
      addNewNode(node, this.node1, this.items)
      this.key++
    },
    delNode(node) {
      delNode(node, this.node1, this.items)
      this.key++
    },
    delConditionNode() {
      this.$emit('delConditionNode')
    },
    addConditionFactor(node) {
      this.$emit('addConditionFactor', node)
    }
  }
}
</script>
