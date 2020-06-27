<template>
  <div>
    <Main :data="data" @ok="ok" />
  </div>
</template>
<script>
import Main from '@/components/Generator'
import '@/assets/style.css'
export default {
  components: {
    Main
  },
  data() {
    return {
      data: {
        title: '请假',
        node: {
          name: '发起人',
          type: 'start',
          nodeId: 'sid-startevent',
          childNode: {}
        }
      }
    }
  },
  methods: {
    ok(data) {
      console.log(data)
    }
  }
}
</script>