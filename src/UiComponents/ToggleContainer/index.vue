<template>
  <ContentWrapper @click="toggleRenderSlot">
    <HeaderWrapper>
      <BaseH5 class="ml-1">{{ header }}</BaseH5>
      <RotateWrapper :rotated="!shouldRenderSlot"><ShevronIcon/></RotateWrapper>
    </HeaderWrapper>
    <div ref="childrenContainer">
      <slot v-if="shouldRenderSlot"/>
    </div>
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
      shouldRenderSlot: true,
      containyerHeight: undefined
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
