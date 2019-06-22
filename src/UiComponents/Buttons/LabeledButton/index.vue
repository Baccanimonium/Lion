<template>
  <Container v-on="_events">
    <RoundButton></RoundButton>
    <span class="ml-1">
      <slot/>
    </span>
  </Container>

</template>

<script>
import * as components from './components'

export default {
  name: 'LabeledButton',
  components
}
</script>

<style scoped>

</style>
