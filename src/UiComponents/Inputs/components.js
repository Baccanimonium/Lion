import styled from 'vue-styled-components'

const InputProps = { hasError: Boolean }

export const Input = styled('input', InputProps)`
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.middleGray};
  padding: 1rem 1.3rem;
  height: 4rem;
  width: 100%;
  &[haserror] {
    border-color: ${props => props.theme.errorColor};
  }
`

export const TextArea = Input.withComponent('textarea')

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
`

const LabelProps = { required: Boolean }

export const Label = styled.label`
  padding-bottom: 0.5rem;
`

export const LabelText = styled('span', LabelProps)`
  position: relative;
  &::after {
    content: '*';
    position: absolute;
    top: -0.2rem;
    right: -0.4rem;
    display: ${props => props.required ? 'block' : 'none'};
  }
`

export const FieldContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
`

export const ErrorContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: -1.7rem;
  font-size: 1rem;
  color: ${props => props.theme.errorColor};
`
