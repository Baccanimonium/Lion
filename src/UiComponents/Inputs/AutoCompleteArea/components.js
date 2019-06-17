import styled from 'vue-styled-components'

import { Input } from '@/UiComponents/Inputs/components'

export const HintArea = styled(Input.withComponent('div'))`
  min-height: 30rem;
  position: relative;
`
export const HintLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 1rem 1.3rem;
  word-wrap: anywhere;
  color: transparent;
`

export const Hint = styled.div`
  position: absolute;
  word-wrap: normal;
  color: ${props => props.theme.black};
  display: flex;
  flex-direction: column;
  top: 1.2rem;
  left: 0.2rem;
  
`
