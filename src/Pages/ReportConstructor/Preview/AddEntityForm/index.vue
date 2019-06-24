<template>
  <Dialogue
    :dialogueParams="dialogueParams"
    :shouldRender="shouldRenderDialogue"
    @close="_events.close"
    @submit="handleSubmit"
  >
    <NewEntityFormWrapper>
      <InputComponent
        id="label"
        label="Name of entity"
        :value="formPayload.label"
        :submitFailed="submitFailed"
        :validationErrors="validationErrors.label"
        :validationRules="rules.label"
        @input="handleInput"
      />
      <AlgebraicSymbolsWrapper>
        <AlgebraicLabel
          v-for="(s, index) of algebraicHints"
          :key="s"
          :class="{ 'mr-1': index !== algebraicHints.length - 1 }"
          @click="applyHint(s)"
          :disabled="disabledAlgebraic"
        >
          {{s}}
        </AlgebraicLabel>
      </AlgebraicSymbolsWrapper>
      <SideBarContainer>
        <BaseH5 class="mb-1 ml-1">sales</BaseH5>
        <EntityButton
          v-for="(entity, index) of entity"
          :key="entity"
          :class="{ 'mb-1': entity.length - 1 !== index }"
          :entity="entity"
          :selected="false"
          :renderIcon="false"
          :disabled="!disabledAlgebraic"
          @click="applyField(entity)"
        >
          {{entity}}
        </EntityButton>
      </SideBarContainer>
      <AutoCompleteAreaComponent
        @input="handleInput"
        id="formula"
        :hintValues="disabledAlgebraic ? normalizedHintsValues : algebraicHints"
        :submitFailed="submitFailed"
        :validationErrors="validationErrors.formula"
        :value="formPayload.formula"
      >
      </AutoCompleteAreaComponent>
    </NewEntityFormWrapper>
  </Dialogue>
</template>

<script>
import WithForm from '@/mixins/withForm'
import EntityButton from '../EntityButton'
import * as components from './components'

export default {
  name: 'AddEntityForm',
  components: { ...components, EntityButton },
  mixins: [WithForm],
  props: {
    shouldRenderDialogue: {
      type: Boolean,
      default: false
    },
    hintPrefix: {
      type: String,
      required: true
    },
    entity: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      dialogueParams: {
        title: 'add new entity',
        submitLabel: 'save'
      },
      rules: {
        label: 'required',
        formula: 'required|notEndedOnAlgebraicSign'
      },
      algebraicHints: ['+', '-', '*', '/']
    }
  },
  watch: {
    shouldRenderDialogue (newValue) {
      if (!newValue) this.resetForm()
    }
  },
  computed: {
    normalizedHintsValues () {
      return this.entity.map(hint => `"${this.hintPrefix}.${hint}"`)
    },
    disabledAlgebraic () {
      const { formula = '' } = this.formPayload
      return formula.split(' ').length % 2 === 1
    }
  },
  methods: {
    applyField (field) {
      this.applyHint(`"${this.hintPrefix}.${field}"`)
    },
    applyHint (hint) {
      const { formula } = this.formPayload
      this.handleInput(formula ? `${formula}${hint} ` : `${hint} `, 'formula')
    },
    submitForm (value) {
      this.$emit('submit', value)
    }
  }
}
</script>

<style scoped>

</style>
