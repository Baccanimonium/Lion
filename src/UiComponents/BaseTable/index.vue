<template>
  <HotTable :data="data" rowHeaders="true" colHeaders="true" />
</template>

<script>
import { HotTable } from '@handsontable/vue'
export default {
  name: 'BaseTable',
  components: {
    HotTable
  },
  data: function () {
    return {
      data: [
        ['', 'Ford', 'Volvo', 'Toyota', 'Honda'],
        ['2016', 10, 11, 12, 13],
        ['2017', 20, 11, 14, 13],
        ['2018', 30, 15, 12, 13]
      ]
    }
  }
}
</script>

<style src="@/../node_modules/handsontable/dist/handsontable.full.css"></style>
