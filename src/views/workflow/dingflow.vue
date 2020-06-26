<template>
  <div id="app-container">
    <Main :data.sync="data" @ok="ok" />
  </div>
</template>

<script>
import '@/assets/style.css'
import Main from '@/components/Generator/Main'
export default {
  name: 'dingflow',
  components: {
    Main
  },
  props: {
    data: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
    }
  },
  methods: {
    ok(data) {
      console.log(data)
      this.$emit('update:data', data)
    }
  }
}
</script>

<style>
</style>
