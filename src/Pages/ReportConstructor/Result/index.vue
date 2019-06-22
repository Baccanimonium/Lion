<template>
  <ResultWrapper>
    <ActionsContainer>
      <BaseSecondaryButton @click="storageData">save</BaseSecondaryButton>
    </ActionsContainer>
    <BaseTable
      :options="mergedSettings"
      :data="data"
      @instaciated="setTableInst"
    />
    <ButtonsWrapper>
      <LabeledButton @click="addRow">add row</LabeledButton>
    </ButtonsWrapper>
  </ResultWrapper>
</template>

<script>
import merge from 'lodash/merge'
import { GET_REPORT_COLUMNS, STORAGE_REPORT } from '@/Pages/ReportConstructor/module'
import removeQuotes from '@/utils/removeQuotes'
import stringify, { stringifyFunctionBody } from '@/utils/stringify'
import normalizeValue from '@/utils/normalizeComputedValue'

import * as components from './components'
import { ActionsContainer } from '../Preview/components'

export default {
  name: 'Result',
  components: { ...components, ActionsContainer },
  data () {
    return {
      hotInstance: undefined,
      data: [{}],
      staticHoSettings: {
        startRows: 1,
        afterChange: this.afterChangeObserver
      }
    }
  },
  computed: {
    mergedSettings () {
      return { ...this.staticHoSettings, ...this.normalizedConfig.settings }
    },
    normalizedConfig () {
      return this.reportColumns.reduce((acc, { label, data, domain, formula }, i) => {
        acc.settings.colHeaders.push(label.toUpperCase())
        if (formula) {
          const { args, body } = formula.trim().split(' ').reduce((a, f, i) => {
            const { args, body } = a
            if (i % 2 === 0) {
              const normalizedArgument = removeQuotes(f)
              const [key, subKey] = normalizedArgument.split('.')
              if (!args.has(key)) args.set(key, new Set())
              args.get(key).add(subKey)
              body.push(subKey)
            } else {
              body.push(f)
            }
            return a
          }, { args: new Map(), body: [] })
          acc.settings.columns.push({ data: label, readOnly: true })
          // eslint-disable-next-line no-new-func
          acc.cbOnChanges.set(i, new Function(`{${stringify(args, true)}}`, stringifyFunctionBody(body)))
          acc.calculatedColumnsHeaders.push(label)
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
        settings: { colHeaders: [], columns: [], dataSchema: { } },
        cbOnChanges: new Map(),
        calculatedColumnsHeaders: []
      })
    },
    reportColumns () {
      return this.$store.getters[GET_REPORT_COLUMNS]
    }
  },
  methods: {
    setTableInst (hotInstance) {
      this.hotInstance = hotInstance
    },
    addRow () {
      const { hotInstance } = this
      hotInstance.alter('insert_row', hotInstance.countRows(), 1)
      hotInstance.updateSettings({ height: hotInstance.view.TBODY.clientHeight + hotInstance.view.THEAD.clientHeight })
    },
    afterChangeObserver (args, eventName) {
      if (eventName === 'edit') {
        this.setDataAtCells(args.reduce((acc, [row, label]) => {
          if (!this.normalizedConfig.calculatedColumnsHeaders.includes(label)) {
            this.normalizedConfig.cbOnChanges.forEach((cb, key) => {
              acc.push([row, key, normalizeValue(cb(this.hotInstance.getSourceDataAtRow(row)))])
            }, this)
          }
          return acc
        }, []))
      }
    },
    setDataAtCells (data) {
      if (data.length > 0) this.hotInstance.setDataAtCell(data)
    },
    storageData () {
      this.$store.commit(STORAGE_REPORT, this.hotInstance.getSourceData())
    }
  }
}
</script>

<style scoped>

</style>
