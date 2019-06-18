<template>
  <Dialogue
    :dialogueParams="dialogueParams"
    :shouldRender="shouldRenderDialogue"
    @close="_events.close"
    @submit="handleSubmit"
  >
    <NewEntityFormWrapper>
      <InputComponent
        id="name"
        label="Name of entity"
        :value="formPayload.name"
        :validationFailed="validationFailed"
        :validationErrors="validationErrors.name"
        :validationRules="rules.name"
        @input="handleInput"
      />
      <AlgebraicSymbolsWrapper>
        <AlgebraicLabel
          v-for="(s, index) of algebraicHints"
          :key="s"
          :class="{ 'mr-1': index !== algebraicHints.length - 1 }"
          @click="applyHint(s)"
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
        >
          {{entity}}
        </EntityButton>
      </SideBarContainer>
      <AutoCompleteArea
        @input="handleInput"
        id="formula"
        :hintPrefix="hintPrefix"
        :hintValues="entity"
        :value="formPayload.formula"
      >
      </AutoCompleteArea>
      {{ formPayload.formula }}
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
        name: 'required',
        formula: 'required'
      },
      algebraicHints: ['+', '-', '*', '/']
    }
  },
  methods: {
    applyHint (hint) {
      const { formula = '' } = this.formPayload
      this.handleInput(`${formula} ${hint}`, 'formula')
    }
  },
}
</script>

<style scoped>

</style>