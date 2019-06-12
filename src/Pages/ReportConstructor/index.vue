<template>
  <Tabs
    :tabHeaders="tabHeaders"
    v-model="activeTabIndex"
  >
    <Preview />
  </Tabs>
</template>

<script>
import Preview from './Preview'

export default {
  name: 'ReportConstructor',
  components: {
    Preview
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
