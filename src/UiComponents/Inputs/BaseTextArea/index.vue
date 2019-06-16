
<script>
import InputMixin from '@/mixins/InputMixin'
import { TextArea } from '@/UiComponents/Inputs/components'

export default {
  name: 'BaseTextArea',
  mixins: [InputMixin],
  render (h) {
    return (
      h(TextArea, {
        props: this.$props,
        attrs: this.$attrs,
        on: {
          input: this.handleChange,
          ...this.events
        }
      })
    )
  }
}
</script>

<style scoped>

</style>
