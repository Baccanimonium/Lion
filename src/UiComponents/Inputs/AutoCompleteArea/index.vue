<template>
  <HintArea>
    <textarea
      :value="value"
      v-bind="$attrs"
      class="autocomplete-textarea"
      type="text"
      ref="inputs"
      style=""
      @input="handleInput"
      @keypress.enter.prevent="selectFirstHint"
    >
    </textarea>
    <HintLabel @click="focusLastInput">
      <Hint
        v-if="hints"
        :style="hintLabelStyles"
      >
        <HintItem
          v-for="(h, index) of hints"
          :key="index"
          :last="index === hints.length - 1"
          v-html="h.hintLabel"
          @click="applyHint(h)"
        />
      </Hint>
    </HintLabel>
  </HintArea>
</template>

<script>
import getCaretCoordinates from 'textarea-caret'
import replaceBetwen from '@/utils/Formats/stringReplaceBetween'
import removeQuotes from '@/utils/Formats/removeQuotes'
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
    }
  },
  data () {
    return {
      off: '',
      hintLabelCords: {},
      hints: undefined
    }
  },
  computed: {
    hintLabelStyles () {
      const { top = 0, height, left } = this.hintLabelCords
      return { top: `${height + top}px`, left: `${left}px` }
    }
  },
  methods: {
    handleInput ({ target }) {
      const { value, selectionEnd } = target
      // проверяем есть ли пробел в конце ввода
      if (this.value.length < value.length && /[\s]$/.test(selectionEnd === value.length ? value : value.slice(0, selectionEnd))) {
        let startIndex = value.trim().lastIndexOf(' ')
        startIndex = startIndex >= 0 ? startIndex + 1 : 0
        const lastItem = removeQuotes(value.slice(startIndex, -1))
        console.log(lastItem)
        this.emitNewVal(replaceBetwen(
          value,
          startIndex,
          value.length - 1,
          this.hintValues.find(item => lastItem === removeQuotes(item)) || '' // гарантируем корректный ввод и дозаполняем кавычки
        ))
        this.hints = undefined
      } else {
        this.calcInputState(target, value, selectionEnd)
      }
    },
    calcInputState (target, value, selectionEnd) {
      this.hintLabelCords = getCaretCoordinates(target, selectionEnd)
      let startIndex = value.slice(0, selectionEnd).lastIndexOf(' ')
      startIndex = startIndex >= 0 ? startIndex + 1 : 0
      let inputQuery = value.slice(startIndex)
      let endWordIndex = inputQuery.indexOf(' ')
      endWordIndex = endWordIndex >= 0 ? endWordIndex : value.length
      this.HintsOptions(inputQuery.slice(0, endWordIndex), [startIndex, endWordIndex])
      this.emitNewVal(value)
    },
    focusLastInput () {
      this.$refs.inputs.focus()
    },
    emitNewVal (value) {
      this.$emit('input', value, this.$attrs.id)
    },
    HintsOptions (value, replaceIndices) {
      this.hints = this.hintValues.reduce((acc, hint) => {
        if (new RegExp(value.replace(/[\\*+-]/, `\\${value}`), 'i').test(hint)) {
          acc.push({
            replaceIndices,
            hintLabel: hint.replace(value, `<span style="font-weight: 500">${value}</span>`),
            hint
          })
        }
        return acc
      }, []).sort(({ hintLabel = '' } = {}, { hintLabel: nextItemLabel = '' } = {}) => {
        return hintLabel.indexOf('<') > nextItemLabel.indexOf('<') ? 1 : -1
      })
    },
    applyHint ({ replaceIndices, hint }) {
      this.emitNewVal(`${replaceBetwen(this.value, ...replaceIndices, hint)} `)
      this.hints = undefined
    },
    selectFirstHint () {
      if (this.hints) this.applyHint(this.hints[0])
    }
  }
}

</script>

<style scoped>
  .autocomplete-textarea {
    border: 0;
    height: 100%;
    width: 100%;
    resize: unset;
    text-transform: uppercase;
  }
</style>
