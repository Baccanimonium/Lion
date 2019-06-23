import 'normalize.css'
import './style/fonts.css'
import './style/global-styles'
import Vue from 'vue'
import { ThemeProvider } from 'vue-styled-components'

import App from './App.vue'
import store from './store'
import theme from './style/theme'

import Icon from '@/UiComponents/Icon'
import { Close } from '@/icons/Close'
import { AddIcon } from '@/icons/AddIcon'
import { Shevron } from '@/icons/Shevron'

const requireComponent = require.context(
  // Относительный путь до каталога компонентов
  './UiComponents',
  // Обрабатывать или нет подкаталоги
  true,
  // Регулярное выражение для определения файлов базовых компонентов
  /index.(vue|js)$/
)
// итерируемся по списку компонентов
requireComponent.keys().forEach(fileName => {
  // получаем название функции и содержимое
  Object.entries(requireComponent(fileName)).forEach(([key, component]) => {
    // регистрируем компонент либо по названию функции либо по названию папки
    Vue.component(key === 'default' ? component.name : key, component)
  })
})

Vue.component('CloseIcon', Icon(Close))
Vue.component('AddIconIcon', Icon(AddIcon))
Vue.component('ShevronIcon', Icon(Shevron))

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(ThemeProvider, { props: { theme: theme } }, [h(App)])
}).$mount('#app')
