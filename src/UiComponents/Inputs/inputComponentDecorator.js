import Vue from 'vue'
import DefaultInputWrapper from './DefaultInputWrapper.vue'
import WithValidation from '@/mixins/WithValidation'

export default (component) => {
  const { props } = typeof component === 'function' ? component.extendOptions : component
  const { mixins = [] } = component
  return Vue.component('InputComponent', {
    mixins: [WithValidation],
    props: {
      ...props,
      ...mixins.reduce((acc, { props }) => {
        return { ...acc, ...props }
      }, {}),
      label: {
        type: String,
        default: undefined
      }
    },
    data () {
      return {
        touched: false,
        changed: false
      }
    },
    render (h) {
      const { label, validationErrors, submitFailed, left, ...$props } = this.$props
      return h(
        DefaultInputWrapper, {
          props: {
            label,
            hasError: this.hasError,
            required: this.isRequired,
            validationErrors,
            id: this.$attrs.id
          }
        },
        [h(component, {
          props: $props,
          attrs: {
            ...this.$attrs,
            hasError: this.hasError
          },
          on: {
            ...this._events,
            ...this.$listeners,
            blur: this.handleBlur
          }
        })]
      )
    }
  })
}
