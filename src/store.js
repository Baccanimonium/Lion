import Vue from 'vue'
import Vuex from 'vuex'
import reportConstructor from '@/Pages/ReportConstructor/module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    reportConstructor
  }
})
