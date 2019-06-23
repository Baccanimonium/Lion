import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text } from '@storybook/addon-knobs'

const stories = storiesOf('ToggleContainer', module)
stories.addDecorator(withKnobs)

stories.add('DefaultExample', () => ({
  props: {
    header: {
      default: text('header', 'Заголовок')
    }
  },
  methods: {
    input: action('input')
  },
  template: `
  <div style="height: 250px">
    <ToggleContainer :header="header">
      <BaseButton>Первая кнопка</span></BaseButton>
      <BaseButton>Вторая кнопка</BaseButton>
    </ToggleContainer>
  </div>`
}),
{
  notes: `
  <div>
    <h1>Использование</h1>
    <h2>Пропсы:</h2>
    <ul>
      <li><span>header</span><b> < T String > </b><span>Заголовок контейнера</span></li>
      <li>children's <b> < T [Node] ></b></li>
    </ul>
</div>
  `
})
