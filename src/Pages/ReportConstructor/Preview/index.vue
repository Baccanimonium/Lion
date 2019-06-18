<template>
  <ContentWrapper>
    <SidebarWrapper>
      <BaseH5 class="mb-1">select entity</BaseH5>
      <ToggleContainer
        v-for="group of fieldsEntity"
        :key="group[0]"
        :header="group[0]"
        class="mb-1"
      >
        <EntityButton
          v-for="(entity, index) of group[1]"
          :key="entity"
          :class="{ 'mb-1': group[1].length - 1 !== index }"
          :entity="entity"
          :selected="selectedEntities.has(entity)"
          @click="handleSelectItem"
        >
          {{entity}}
        </EntityButton>
      </ToggleContainer>
    </SidebarWrapper>
    <ResultContainer>
      <ActionsContainer>
        <BaseButton class="mr-1" @click="openDialogue">add</BaseButton>
        <BaseSecondaryButton>save</BaseSecondaryButton>
      </ActionsContainer>
      <SelectedFieldsContainer>
        <SelectedLabelContainer>
          <EntityButton
            v-for="entity of selectedEntities"
            class="mb-1 mr-1"
            :key="entity"
            :entity="entity"
            @click="handleSelectItem"
          >
            {{entity}}
          </EntityButton>
        </SelectedLabelContainer>
      </SelectedFieldsContainer>
    </ResultContainer>
    <AddEntityForm
      :shouldRenderDialogue="shouldRenderDialogue"
      :entity="salesEntity"
      hintPrefix="sales"
      @close="closeDialogue"
    />
  </ContentWrapper>
</template>

<script>
import { GET_ENTITY_FIELDS } from '@/Pages/ReportConstructor/module'

import EntityButton from './EntityButton'
import AddEntityForm from './AddEntityForm'
import * as components from './components'

export default {
  name: 'Preview',
  components: { ...components, EntityButton, AddEntityForm },
  data () {
    return {
      selectedEntities: new Set(),
      shouldRenderDialogue: true,
    }
  },
  computed: {
    fieldsEntity () {
      return this.$store.getters[GET_ENTITY_FIELDS]
    },
    salesEntity () {
      return this.fieldsEntity.get('sales')
    }
  },
  methods: {
    handleSelectItem (item, selected) {
      if (selected) {
        this.selectedEntities.delete(item)
      } else {
        this.selectedEntities.add(item)
      }
      this.selectedEntities = new Set(this.selectedEntities)
    },
    openDialogue () {
      this.shouldRenderDialogue = true
    },
    closeDialogue () {
      this.shouldRenderDialogue = false
    }
  }
}
</script>

<style scoped>

</style>
