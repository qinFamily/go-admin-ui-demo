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
    ErrorsModal
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
    }
  },
  watch: {
    data: {
      handler(val) {
        this.data1 = val
      },
      deep: true
    }
  },
  mounted() {
    if (this.data && this.data.node) {
      this.data1 = this.data
    }
    console.log(this.data1)
    if (!this.data1.node) {
      this.initialNode()
    }
    this.iteratorData(this.data1.node)
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
      // console.log('添加节点:' + node.nodeId)
      addNewNode(node, this.data1.node, this.items)
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
      this.$emit('ok', this.data1)
      console.log(this.data1)
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
  }
}
</script>

<style scoped>
</style>