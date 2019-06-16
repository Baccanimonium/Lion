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
      const { label, validationErrors, validationFailed, left, ...$props } = this.$props

      return h(
        DefaultInputWrapper, {
          props: {
            label,
            required: this.isRequired,
            id: this.$attrs.id,
            validationErrors,
            validationFailed,
            changed: this.changed,
            touched: this.touched
          }
        },
        [h(component, {
          class: {
            'has-error': this.hasError
          },
          props: $props,
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
