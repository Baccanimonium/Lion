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
          :domain="group[0]"
          :class="{ 'mb-1': group[1].length - 1 !== index }"
          :entity="entity"
          :selected="isEntitySelected(entity)"
          @click="handleSelectItem"
        >
          {{entity}}
        </EntityButton>
      </ToggleContainer>
    </SidebarWrapper>
    <ResultContainer>
      <ActionsContainer>
        <BaseButton @click="openDialogue">add</BaseButton>
      </ActionsContainer>
      <SelectedFieldsContainer>
        <SelectedLabelContainer>
          <EntityButton
            v-for="entity of reportColumns"
            :key="entity.label"
            :entity="entity.label"
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
      @submit="applyGenericField"
    />
  </ContentWrapper>
</template>

<script>
import { GET_ENTITY_FIELDS, GET_REPORT_COLUMNS, SET_REPORT_COLUMNS } from '@/Pages/ReportConstructor/module'

import EntityButton from './EntityButton'
import AddEntityForm from './AddEntityForm'
import * as components from './components'

export default {
  name: 'Preview',
  components: { ...components, EntityButton, AddEntityForm },
  data () {
    return {
      shouldRenderDialogue: false
    }
  },
  computed: {
    fieldsEntity () {
      return this.$store.getters[GET_ENTITY_FIELDS]
    },
    reportColumns: {
      get: function () {
        return this.$store.getters[GET_REPORT_COLUMNS]
      },
      set: function (value) {
        this.$store.commit(SET_REPORT_COLUMNS, value)
      }
    },
    salesEntity () {
      return this.fieldsEntity.get('sales')
    }
  },
  methods: {
    handleSelectItem (entityName, domain) {
      this.reportColumns = { label: entityName, data: `${domain}.${entityName}`, domain }
    },
    openDialogue () {
      this.shouldRenderDialogue = true
    },
    closeDialogue () {
      this.shouldRenderDialogue = false
    },
    applyGenericField (field) {
      this.reportColumns = field
      this.closeDialogue()
    },
    isEntitySelected (entity) {
      return this.reportColumns.findIndex(({ label }) => label === entity) >= 0
    }
  }
}
</script>

<style scoped>

</style>
