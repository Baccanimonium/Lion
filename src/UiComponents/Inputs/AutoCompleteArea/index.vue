<template>
  <HintArea>
    <textarea
      type="text"
      ref="inputs"
      style="border: 0; height: 100%; width: 100%; resize: unset;"
      @input="handleInput"
    >
    </textarea>
    <HintLabel @click="focusLastInput">
      {{value}}
      <span style="position: relative">
        <Hint v-if="hits">
          <div
            v-for="(h, index) of hits"
            :key="index"
            v-html="h"
          />
        </Hint>
      </span>
    </HintLabel>
  </HintArea>
</template>

<script>
import * as components from './components'
export default {
  name: 'AutoCompleteArea',
  components,
  props: {
    hintValues: {
      type: Array,
      default: () => [],
      required: true
    },
    value: {
      type: String,
      default: () => ''
    },
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      off: '',
      hits: undefined
    }
  },
  watch: {
    value (newValue) {
      this.HintsOptions(newValue)
    }
  },
  methods: {
    handleInput (e) {
      const { target: { value } } = e
      this.emitNewVal(value)
    },
    focusLastInput () {
      this.$refs.inputs.focus()
    },
    emitNewVal (value) {
      this.$emit('input', value, this.id)
    },
    HintsOptions (value) {
      this.hits = value
        ? this.hintValues.reduce((acc, hint) => {
          if (new RegExp(value, 'i').test(hint)) {
            acc.push(hint.replace(value, `<span style="font-weight: 500">${value}</span>`))
          }
          return acc
        }, []).sort((item, nextItem) => item.indexOf('<') > nextItem.indexOf('<') ? 1 : -1)
        : undefined
    }
  }
}
</script>

<style scoped>

</style>
