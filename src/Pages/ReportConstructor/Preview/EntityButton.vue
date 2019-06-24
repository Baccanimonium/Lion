<template>
  <EntityLabel @click.stop="toggleItem" :selected="selected">
    <EntityContentWrapper>
      <span>{{ entity }}</span>
      <CloseIcon
        v-if="selected && renderIcon"
        size="14"
      />
      <AddIconIcon
        v-else-if="!selected && renderIcon"
        size="14"
      />
    </EntityContentWrapper>
  </EntityLabel>
</template>

<script>
import { EntityLabel, EntityContentWrapper } from './components'

export default {
  name: 'EntityButton',
  components: {
    EntityLabel,
    EntityContentWrapper
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
    },
    renderIcon: {
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
