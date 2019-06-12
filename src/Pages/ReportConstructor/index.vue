<template>
  <ContentWrapper>
    <SidebarWrapper>

    </SidebarWrapper>
    <ResultContainer>
      <ActionsContainer>
        <BaseButton class="default-margin-right">add</BaseButton>
        <BaseSecondaryButton>save</BaseSecondaryButton>
      </ActionsContainer>
      <SelectedFieldsContainer>
      
      </SelectedFieldsContainer>
    </ResultContainer>
  </ContentWrapper>
</template>

<script>
import * as components from './components'
export default {
  name: 'ReportConstructor',
  components: components
}
</script>

<style scoped>

</style>
