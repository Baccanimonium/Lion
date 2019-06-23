import styled from 'vue-styled-components'

import { BaseButton } from '@/UiComponents/Buttons/index'

export const Container = styled.div`
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
`

export const RoundButton = styled(BaseButton)`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: ${props => props.theme.mainGray};
  color: ${props => props.theme.black};
`
