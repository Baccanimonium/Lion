import Vue from 'vue'
import DefaultInputWrapper from './DefaultInputWrapper.vue'
import WithValidation from '@/mixins/WithValidation'

export default (component) => {
  const { props } = typeof component === 'function' ? component.extendOptions : component

  return Vue.component('InputComponent', {
    mixins: [WithValidation],
    props: {
      ...props,
      ...component.mixins.reduce((acc, { props }) => {
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
            required: this.isRequired,
            hasError: this.hasError,
            validationErrors,
            id: this.$attrs.id
          }
        },
        [h(component, {
          props: {
            ...$props,
            hasError: this.hasError
          },
          attrs: this.$attrs,
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
