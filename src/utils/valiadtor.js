import Validator from 'validatorjs'
import merge from 'lodash/merge'

Validator.register('notEndedOnAlgebraicSign', function (value) { // requirement parameter defaults to null
  return !/[/|*|+|-]$/.test(value)
}, 'Значение не должно заканчиваться на математический знак операции')

const messages = {
  required: 'Поле обязательно к заполнению',
  required_without: 'Поле обязательно к заполнению',
  numeric: 'Поле обязательно к заполнению',
  size: 'Длина значения поля должна быть равна :size',
  min: 'Длина значения должна быть больше, чем :min',
  max: 'Длина значения должна быть меньше, чем :max'
}
export function getValidation (values, rules, options = {}) {
  const { onFail = () => null, onSuccess = () => null } = options

  const validation = new Validator(values, rules, messages)

  if (validation.fails()) {
    onFail(Object.entries(validation.errors.all()).reduce((acc, [ propertyPath, message ]) => {
      const extractedError = propertyPath
        .match(/[^\][.]+/g)
        .reverse()
        .reduce((accumulator, key, i) => {
          if (i === 0) return { [key]: message }
          return { [key]: accumulator }
        }, {})
      return merge(acc, extractedError)
    }, {}))
  } else {
    onSuccess(values)
    return {}
  }
}
