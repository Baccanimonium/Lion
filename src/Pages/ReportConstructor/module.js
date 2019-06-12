export const GET_ENTITY_FIELDS = 'REPORT_CONSTRUCTOR/GET_ENTITY_FIELDS'

const state = {
  entityFields: new Map([
    ['location', ['city', 'index', 'street']],
    ['employees', ['full-name', 'department', 'position']],
    ['sales', ['price', 'quantity', 'vat']]
  ])
}

// const actions = {
//   [GET_CONFIG_TYPE]: async ({ commit }, { reqPayload }) => {
//     const { data } = await rest('type/config', reqPayload)
//     commit('GET_CONFIG_TYPE', data)
//   }
// }
// const mutations = {
//   GET_CONFIG_TYPE: (state, payload) => {
//     state.listTypeDoc = payload
//   }
// }

const getters = {
  [GET_ENTITY_FIELDS]: state => state.entityFields
}
export default {
  state,
  getters
}
