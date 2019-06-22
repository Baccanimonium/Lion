export const GET_ENTITY_FIELDS = 'REPORT_CONSTRUCTOR/GET_ENTITY_FIELDS'
export const GET_REPORT_COLUMNS = 'REPORT_CONSTRUCTOR/GET_REPORT_COLUMNS'
export const SET_REPORT_COLUMNS = 'REPORT_CONSTRUCTOR/SET_REPORT_COLUMNS'
export const STORAGE_REPORT = 'REPORT_CONSTRUCTOR/STORAGE_REPORT'

const state = {
  entityFields: new Map([
    ['location', ['city', 'index', 'street']],
    ['employees', ['full-name', 'department', 'position']],
    ['sales', ['price', 'quantity', 'vat']]
  ]),
  reportColumns: [], // {label, data, domain, formula}
  completedReport: undefined
}

const mutations = {
  [SET_REPORT_COLUMNS]: (state, payload) => {
    const { reportColumns } = state
    if (reportColumns.findIndex(({ label }) => label === payload.label) >= 0) {
      state.reportColumns = reportColumns.filter(({ label }) => label !== payload.label)
    } else {
      state.reportColumns = [...reportColumns, payload]
    }
  },
  [STORAGE_REPORT]: (state, payload) => {
    state.completedReport = payload
  }
}

const getters = {
  [GET_ENTITY_FIELDS]: state => state.entityFields,
  [GET_REPORT_COLUMNS]: state => state.reportColumns
}
export default {
  state,
  mutations,
  getters
}
