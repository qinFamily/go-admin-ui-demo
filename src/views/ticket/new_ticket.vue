<template>
  <div class="app-container">
    <el-card v-for="(item, key) in list" :key="item.id" class="box-card">
      <div slot="header">
        <span class="card-title">{{item.name}}</span>
      </div>
      <el-row :gutter="20">
        <el-col v-for="w in item.workflow_set" :key="w.id" :span="4">
          <div style="height:50px;">
            <router-link :class="'pan-btn ' + wf_color[key]" :to="'/u_ticket/' + w.id">{{w.name}}</router-link>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { workflowtype, auth } from '@/api/all'
import {
  checkAuthAdd,
  checkAuthDel,
  checkAuthView,
  checkAuthUpdate
} from '@/utils/permission'

export default {
  name: 'NewTicket',
  components: {},
  data() {
    return {
      operationList: [],
      permissionList: {
        add: false,
        del: false,
        view: false,
        update: false
      },
      list: [],
      wf_color: {
        0: 'blue-btn',
        1: 'pink-btn',
        2: 'green-btn',
        3: 'yellow-btn',
        4: 'tiffany-btn'
      }
    }
  },
  computed: {},
  created() {
    this.getMenuButton()
    this.getList()
  },
  methods: {
    checkPermission() {
      this.permissionList.add = checkAuthAdd(this.operationList)
      this.permissionList.del = checkAuthDel(this.operationList)
      this.permissionList.view = checkAuthView(this.operationList)
      this.permissionList.update = checkAuthUpdate(this.operationList)
    },
    getMenuButton() {
      auth
        .requestMenuButton('new_ticket')
        .then(response => {
          this.operationList = response.results
        })
        .then(() => {
          this.checkPermission()
        })
    },
    getList() {
      workflowtype.requestGet().then(response => {
        this.list = response.results
      })
    }
  }
}
</script>
