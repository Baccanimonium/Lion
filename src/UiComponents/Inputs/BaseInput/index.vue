
<script>
import InputMixin from '@/mixins/InputMixin'
import { Input } from '@/UiComponents/Inputs/components'

export default {
  name: 'BaseInput',
  mixins: [InputMixin],
  render (h) {
    return (
      h(Input, {
        props: this.$props,
        attrs: this.$attrs,
        on: {
          ...this.events,
          input: this.handleChange
        }
      })
    )
  }
}
</script>

<style scoped>

</style>
