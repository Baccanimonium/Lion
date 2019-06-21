<template>
  <HotTable
    :settings="mergedSettings"
    :data="data"
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
  data: function () {
    return {
      containerWidth: 1000,
      defaultSettings: {
        licenseKey: 'non-commercial-and-evaluation',
        colHeaders: true,
        stretchH: 'all'
      }
    }
  }
}
</script>

<style src="@/../node_modules/handsontable/dist/handsontable.full.css"></style>
