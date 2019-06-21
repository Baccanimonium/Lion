
export default {
  props: {
    validationRules: {
      type: String,
      default: ''
    },
    submitFailed: {
      type: Boolean,
      default: false
    },
    validationErrors: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      touched: false,
      changed: false
    }
  },
  computed: {
    hasError () {
      const { submitFailed, changed, touched, value, validationErrors: { length } } = this
      return length > 0 ? (submitFailed && !changed && !value) || touched : false
    },
    isRequired () {
      return !this.$attrs.value && !!this.validationRules.match('required')
    }
  },
  watch: {
    submitFailed (newVal) {
      if (newVal) {
        this.changed = false
        this.touched = true
      }
    }
  },
  methods: {
    handleBlur () {
      this.touched = true
      this.changed = true
    }
  }
}
