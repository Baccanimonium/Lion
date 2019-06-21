<template>
  <ResultWrapper>
    <BaseTable
      :options="normalizedConfig.settings"
      :data="normalizedData"
    />
  </ResultWrapper>
</template>

<script>
import merge from 'lodash/merge'
import { GET_REPORT_COLUMNS } from '@/Pages/ReportConstructor/module'
import removeQuotes from '@/utils/removeQuotes'
import { alphabet } from '@/constants'
import * as components from './components'
// columns: [{
//   type: 'autocomplete',
//   source: function(query, callback) {
//     fetch('https://example.com/query?q=' + query, function(response) {
//       callback(response.items);
//     })
//   }
// }],

export default {
  name: 'Result',
  components,
  data () {
    return {
      data: [{
        // 'location.city': 2,
        // 'location.index': 1,
        // 'location.street': 2,
        // 'employees.full-name': 3,
        // 'employees.department': 4,
        // 'employees.position': 5,
        // 'sales.price': 6,
        // 'sales.quantity': 7,
        // 'sales.vat': 8
      }]
    }
  },
  computed: {
    normalizedData () {
      return this.data.map((values, i) => ({
        ...values,
        ...Object.entries(this.normalizedConfig.formula).reduce((acc, [key, value]) => {
          acc[key] = `=${value.trim().replace(/{i}/gi, `${i + 1}`)}`
          return acc
        }, {})
      }))
    },
    normalizedConfig () {
      return this.reportColumns.reduce((acc, { label, data, domain, formula }, index, arr) => {
        acc.settings.colHeaders.push(label)
        if (formula) {
          const { normalizedFormula } = formula.trim().split(' ').reduce((a, f, i) => {
            if (i % 2 === 0) {
              const normalizedArgument = removeQuotes(f)
              if (a.memoizeIndexes.has(normalizedArgument)) {
                a.normalizedFormula = `${a.normalizedFormula} ${a.memoizeIndexes.get(normalizedArgument)}`
              } else {
                const symbol = `${alphabet[arr.findIndex(({ data }) => data === normalizedArgument)]}{i}`
                a.memoizeIndexes.set(normalizedArgument, symbol)
                a.normalizedFormula = `${a.normalizedFormula} ${symbol}`
              }
            } else {
              a.normalizedFormula = `${a.normalizedFormula} ${f}`
            }
            return a
          }, { memoizeIndexes: new Map(), normalizedFormula: '' })
          acc.settings.columns.push({ data: label })
          acc.formula[label] = normalizedFormula
        } else {
          acc.settings.columns.push({ data, type: 'text' })
          if (domain) {
            acc.settings.dataSchema = merge(acc.settings.dataSchema, { [domain]: { [label]: null } })
          } else {
            acc.settings.dataSchema[label] = null
          }
        }
        return acc
      }, {
        settings: { colHeaders: [], columns: [], dataSchema: { }, startRows: 1, formulas: true },
        formula: {}
      })
    },
    reportColumns () {
      return this.$store.getters[GET_REPORT_COLUMNS]
    }
  }
}
</script>

<style scoped>

</style>
