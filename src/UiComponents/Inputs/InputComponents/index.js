import InputComponentDecorator from '../inputComponentDecorator'
import Input from '../BaseInput'
import AutoCompleteArea from '../AutoCompleteArea'

export const InputComponent = InputComponentDecorator(Input)

export const AutoCompleteAreaComponent = InputComponentDecorator(AutoCompleteArea)
