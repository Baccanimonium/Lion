<template>
  <ContentWrapper>
    <SidebarWrapper>
      <BaseH5 class="default-margin-bottom">select entity</BaseH5>
      <ToggleContainer
        v-for="group of fieldsEntity"
        :key="group[0]"
        :header="group[0]"
        class="default-margin-bottom"
      >
        <EntityButton
          v-for="(entity, index) of group[1]"
          :key="entity"
          :class="{ 'default-margin-bottom': group[1].length - 1 !== index }"
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
        <BaseButton class="default-margin-right">add</BaseButton>
        <BaseSecondaryButton>save</BaseSecondaryButton>
      </ActionsContainer>
      <SelectedFieldsContainer>
        <SelectedLabelContainer>
          <EntityButton
            v-for="entity of selectedEntities"
            class="default-margin-bottom default-margin-right"
            :key="entity"
            :entity="entity"
            @click="handleSelectItem"
          >
            {{entity}}
          </EntityButton>
        </SelectedLabelContainer>
      </SelectedFieldsContainer>
    </ResultContainer>
  </ContentWrapper>
</template>

<script>
import { GET_ENTITY_FIELDS } from '@/Pages/ReportConstructor/module'
import EntityButton from './EntityButton'
import * as components from './components'

export default {
  name: 'ReportConstructor',
  components: { ...components, EntityButton },
  data () {
    return {
      selectedEntities: new Set()
    }
  },
  computed: {
    fieldsEntity () {
      return this.$store.getters[GET_ENTITY_FIELDS]
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
    }
  },
}
</script>

<style scoped>

</style>
