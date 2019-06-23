<template>
  <transition name="appear">
    <DialoueWrapper v-if="shouldRender">
      <DialogueArea @click="closeDialogue"/>
      <DialogueContainer :style="dialogueStyles">
        <DialogueHeaderContainer>
          <BaseH5>
            {{ dialogueParams.title }}
          </BaseH5>
          <CloseIcon size="14" @click="closeDialogue" />
        </DialogueHeaderContainer>
        <slot/>
        <ActionsContainer v-if="dialogueParams.submitLabel">
          <BaseSecondaryButton @click="submitDialogue">
            {{ dialogueParams.submitLabel }}
          </BaseSecondaryButton>
        </ActionsContainer>
      </DialogueContainer>
    </DialoueWrapper>
  </transition>
</template>

<script>
import * as components from './components'

export default {
  name: 'Dialogue',
  components,
  props: {
    shouldRender: Boolean,
    dialogueParams: {
      type: Object,
      default: () => ({})
    },
    offsetTop: {
      type: String,
      default: '15vh'
    },
    width: {
      type: String,
      default: '50%'
    }
  },
  computed: {
    dialogueStyles () {
      return `margin-top: ${this.offsetTop}; width: ${this.width}`
    }
  },
  methods: {
    closeDialogue () {
      this.$emit('close')
    },
    submitDialogue () {
      this.$emit('submit')
    }
  }
}
</script>

<style scoped>
  .appear-enter-active, .appear-leave-active {
    transition-property: opacity, transform;
    transition-duration: 300ms;
    transition-timing-function: cubic-bezier(.25,.8,.5,1);
  }
  .appear-enter {
    transform: translateY(-50px);
    opacity: 0;
  }
  .appear-leave-to {
    transform: translateY(-50px);
    opacity: 0;
  }
</style>
