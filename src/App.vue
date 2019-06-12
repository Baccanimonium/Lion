<template>
  <AppWrapper>
    <ReportConstructor />
  </AppWrapper>
</template>

<script>
import styled from 'vue-styled-components'
import ReportConstructor from '@/Pages/ReportConstructor'

export const AppWrapper = styled.div`
  height: 100%;
  padding: 45px 20px 25px;
`

export default {
  name: 'app',
  components: {
    ReportConstructor,
    AppWrapper
  }
}
</script>

<style>
</style>
