<template>
  <EntityLabel @click.stop="toggleItem" :selected="selected">
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
    domain: {
      type: String,
      default: undefined
    },
    selected: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toggleItem () {
      this.$emit('click', this.entity, this.domain)
    }
  }
}
</script>

<style scoped>

</style>
