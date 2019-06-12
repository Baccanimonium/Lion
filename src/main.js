import 'normalize.css'
import './style/fonts.css'
import './style/global-styles'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { ThemeProvider } from 'vue-styled-components'
import theme from './style/theme'

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
    Vue.component(key === 'default' ? new RegExp(/\/(.*)\/index/).exec(fileName)[1] : key, component)
  })
})

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(ThemeProvider, { props: { theme: theme } }, [h(App)])
}).$mount('#app')
