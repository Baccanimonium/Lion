export default {
  computed: {
    events () {
      const { input, ...event } = this._events
      return event
    }
  },
  methods: {
    handleChange (value) {
      // баг стайлед компонентов, приходится доставать id, в 1.4.5 некорректно приходит value, в текущей версии нет эвента
      this.$emit('input', value, this.$el.id)
    }
  }
}
