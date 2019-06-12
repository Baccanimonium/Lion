<template functional>
  <TabLabel
    v-bind="data.attrs"
    :class="data.class"
    v-on="listeners"
    @dragover.prevent=""
  >
    <slot />
  </TabLabel>
</template>

<script>

export default {
  name: 'TabsButton',
}
</script>

<style>
</style>
