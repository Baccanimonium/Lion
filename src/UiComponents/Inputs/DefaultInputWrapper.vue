<template>
  <InputContainer>
    <Label :for="id">
      <LabelText :required="required">
        {{ label }}
      </LabelText>
    </Label>
    <FieldContainer>
      <slot />
      <ErrorContainer v-if="hasError">
        {{ validationErrors[0] }}
      </ErrorContainer>
    </FieldContainer>
  </InputContainer>
</template>

<script>
import { InputContainer, Label, LabelText, FieldContainer, ErrorContainer } from './components'

export default {
  name: 'InputWrapper',
  components: {
    InputContainer, Label, LabelText, FieldContainer, ErrorContainer
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    validationErrors: {
      type: Array,
      default: () => []
    },
    hasError: Boolean,
    required: Boolean
  }
}
</script>

<style scoped>
</style>
