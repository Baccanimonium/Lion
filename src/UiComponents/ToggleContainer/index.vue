<template>
  <ContentWrapper @click="toggleRenderSlot">
    <BaseH5 class="mb-1 ml-1">{{ header }}</BaseH5>
    <slot v-if="shouldRenderSlot"/>
  </ContentWrapper>
</template>

<script>
import * as components from './components'

export default {
  name: 'ToggleContainer',
  components: components,

  props: {
    header: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      shouldRenderSlot: true
    }
  },
  methods: {
    toggleRenderSlot () {
      this.shouldRenderSlot = !this.shouldRenderSlot
    }
  }
}
</script>

<style scoped>

</style>
