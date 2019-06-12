<template>
  <EntityLabel @click.stop="toggleItem">
    {{ entity }}
  </EntityLabel>
</template>

<script>
import { EntityLabel } from './components'

export default {
  name: 'EntityButton',
  components: {
    EntityLabel
  },
  props: {
    entity: {
      type: String,
      required: true
    },
    selected: {
      type: BarProp,
      default: true
    }
  },
  methods: {
    toggleItem () {
      this.$emit('click', this.entity, this.selected)
    }
  }
}
</script>

<style scoped>

</style>
