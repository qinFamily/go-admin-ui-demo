<template>
  <div class="branch-wrap">
    <div class="branch-box-wrap">
      <BranchBox @addCondition="addCondition" @delNode="delNode">
        <ColBox
          v-for="(item,index) in node.conditionNodes"
          :key="index"
          :node="item"
          :pos="index"
          :total="node.conditionNodes ? node.conditionNodes.length : 0"
          @delConditionNode="delConditionNode(item)"
          @addConditionFactor="addConditionFactor"
        />
      </BranchBox>
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
  </div>
</template>
<script>
import BranchBox from './branch-box'
import ColBox from './col-box'
import AddNodeBtnBox from './add-node-btn-box'
import { delConditionNode, setConditionFactor } from './process'
export default {
  components: {
    ColBox,
    BranchBox,
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
  data: () => ({
    //
  }),
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
    addCondition() {
      var lastNode = this.node.conditionNodes[this.node.conditionNodes.length - 1]
      var name = '条件' + this.getName(lastNode.name)
      var node = {
        name: name,
        type: 'condition',
        prevId: lastNode.prevId,
        nodeId: '' + new Date().getTime()
      }
      this.node.conditionNodes.push(node)
    },
    getName(name) {
      var num = parseInt(name.substring(2))
      return num + 1
    },
    addnode(node) {
      // console.log('branch-wrap 新节点:')
      // console.log(node)
      this.$emit('addnode', node)
    },
    delConditionNode(item) {
      delConditionNode(item, this.node)
      if (this.node.conditionNodes.length < 2) {
        this.$emit('delNode')
      }
    },
    delNode() {
      this.$emit('delNode')
    },
    addConditionFactor(conditionNode) {
      setConditionFactor(conditionNode, this.node)
    }
  }
}
</script>
