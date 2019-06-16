<template>
  <InputContainer>
    <Label :for="id">
      <LabelText :required="required">
        {{ label }}
      </LabelText>
    </Label>
    <FieldContainer>
      <slot />
      <ErrorContainer v-if="validationFailed || (!changed && touched)">
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
    validationFailed: Boolean,
    required: Boolean,
    changed: Boolean,
    touched: Boolean
  }
}
</script>

<style scoped>
</style>
