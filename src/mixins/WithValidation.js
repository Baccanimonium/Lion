
export default {
  props: {
    validationRules: {
      type: String,
      default: ''
    },
    validationFailed: {
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
      return this.validationFailed && this.validationErrors.length > 0
    },
    isRequired () {
      return !this.$attrs.value && !!this.validationRules.match('required')
    }
  },
  watch: {
    validationFailed (newVal) {
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
  },
}
