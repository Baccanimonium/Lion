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
    <Dialogue
      :dialogueParams="dialogueParams"
      :shouldRender="shouldRenderDialogue"
      @close="closeDialogue"
      @submit="handleSubmit"
    >
      <NewEntityFormWrapper>
        <InputComponent
          id="name"
          label="Name of entity"
          :value="formPayload.name"
          :validationFailed="validationFailed"
          :validationErrors="validationErrors.name"
          :validationRules="rules.name"
          @input="handleInput"
        />
        <AlgebraicSymbolsWrapper>
          <AlgebraicLabel class="mr-1">+</AlgebraicLabel>
          <AlgebraicLabel class="mr-1">-</AlgebraicLabel>
          <AlgebraicLabel class="mr-1">*</AlgebraicLabel>
          <AlgebraicLabel>/</AlgebraicLabel>
        </AlgebraicSymbolsWrapper>
        <SideBarContainer>
          <BaseH5 class="mb-1 ml-1">sales</BaseH5>
          <EntityButton
            v-for="(entity, index) of salesEntity"
            :key="entity"
            :class="{ 'mb-1': salesEntity.length - 1 !== index }"
            :entity="entity"
            :selected="false"
          >
            {{entity}}
          </EntityButton>
        </SideBarContainer>
<!--        <BaseTextArea-->
<!--          id="formula"-->
<!--          style="min-height: 30rem"-->
<!--          :value="formPayload.formula"-->
<!--          @input="handleInput"-->
<!--        />-->
        <AutoCompleteArea
          @input="handleInput"
          id="formula"
          :hintValues="salesEntity"
          :value="formPayload.formula"
        >
          {{formPayload.formula }}
        </AutoCompleteArea>
        {{ formPayload }}
      </NewEntityFormWrapper>
    </Dialogue>
  </ContentWrapper>
</template>

<script>
import { GET_ENTITY_FIELDS } from '@/Pages/ReportConstructor/module'
import WithForm from '@/mixins/withForm'

import EntityButton from './EntityButton'
import * as components from './components'

export default {
  name: 'Preview',
  components: { ...components, EntityButton },
  mixins: [WithForm],
  data () {
    return {
      selectedEntities: new Set(),
      dialogueParams: {
        title: 'add new entity',
        submitLabel: 'save'
      },
      shouldRenderDialogue: true,
      rules: {
        name: 'required',
        formula: 'required'
      }
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
