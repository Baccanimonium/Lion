/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import { configure } from '@storybook/vue'

const requireComponent = require.context(
  // Относительный путь до каталога компонентов
  '../../src/UiComponents',
  // Обрабатывать или нет подкаталоги
  true,
  // Регулярное выражение для определения файлов базовых компонентов
  /index.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // получаем название функции и содержимое
  Object.entries(requireComponent(fileName)).forEach(([key, component]) => {
    // регистрируем компонент либо по названию функции либо по названию папки
    Vue.component(key === 'default' ? component.name : key, component)
  })
})

const req = require.context('../../src/UiComponents', true, /story.js$/)

function loadStories () {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
