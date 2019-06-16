<template>
  <Tabs
    :tabHeaders="tabHeaders"
    v-model="activeTabIndex"
  >
    <Preview />
    <Result />
  </Tabs>
</template>

<script>
import Preview from './Preview'
import Result from './Result'

export default {
  name: 'ReportConstructor',
  components: {
    Preview,
    Result
  },
  data () {
    return {
      tabHeaders: ['preview', 'result'],
      activeTabIndex: 0
    }
  }
}
</script>

<style scoped>

</style>
