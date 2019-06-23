import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, number, array } from '@storybook/addon-knobs'

const stories = storiesOf('Tabs', module)
stories.addDecorator(withKnobs)

stories.add('DefaultExample', () => ({
  props: {
    tabHeaders: {
      default: array('tabHeaders', ['Страница 1', 'Страница 2'])
    },
    value: {
      default: number('value', 1)
    }
  },
  methods: {
    input: action('input')
  },
  template: '<Tabs :value="value" :tabHeaders="tabHeaders" @input="input" :theme="theme">' +
    '<div style="height: 500px;display: flex; justify-content: center;align-items: center">' +
      '<span>Первая страница</span>' +
    '</div>' +
    '<div style="height: 500px;display: flex; justify-content: center;align-items: center">Вторая страница</div>' +
  '</Tabs>'
}),
{
  notes: `
  <div>
    <h1>Использование</h1>
    <h2>Пропсы:</h2>
    <ul>
      <li><span>value/v-model</span><b> < T Number ></b></li>
      <li>vtabHeaders<b> < T [String] ></b> <span>кол-во заголовков должно быть эквивалетно кол-ву детей</span></li>
      <li>children's <b> < T [Node] ></b></li>
    </ul>
    <h2>Собыитя:</h2>
    <ul>
      <li><b>@input </b> <span>Возвращает индекс активного таба</span></li>
    </ul>
</div>
  `
})
