import { getValidation } from '@/utils/valiadtor'

export default {
  data () {
    return {
      validationErrors: {},
      submitFailed: false,
      formPayload: {}
    }
  },
  methods: {
    handleInput (value, key) {
      const newPayload = { ...this.formPayload, [key]: value }
      this.validate(newPayload)
      this.formPayload = newPayload
    },
    handleSubmit () {
      this.validate(this.formPayload, true)
    },
    validate (values, submit) {
      getValidation(values, this.rules, {
        onFail: this.handleSubmitFail,
        onSuccess: (values) => {
          this.validationErrors = {}
          this.submitFailed = false
          if (submit) this.submitForm(values)
        }
      })
    },
    handleSubmitFail (e) {
      this.submitFailed = true
      this.validationErrors = e
    },
    resetForm () {
      this.validationErrors = {}
      this.submitFailed = false
      this.formPayload = {}
    }
  }
}
