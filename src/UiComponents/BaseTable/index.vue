<template>
  <HotTable
    :settings="mergedSettings"
    :data="data"
    ref="table"
  />
</template>

<script>
import { HotTable } from '@handsontable/vue'
export default {
  name: 'BaseTable',
  props: {
    options: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  components: {
    HotTable
  },
  computed: {
    mergedSettings () {
      return {
        ...this.defaultSettings,
        ...this.options
      }
    }
  },
  mounted () {
    this.hotInstance = this.$refs.table.hotInstance
    this.$emit('instaciated', this.hotInstance)
  },
  data () {
    return {
      hotInstance: undefined,
      defaultSettings: {
        licenseKey: 'non-commercial-and-evaluation',
        colHeaders: true,
        stretchH: 'all',
        height: 50,
        preventOverflow: 'vertical',
        bindRowsWithHeaders: 'strict'
      }
    }
  }
}
</script>

<style src="@/../node_modules/handsontable/dist/handsontable.full.css"></style>
