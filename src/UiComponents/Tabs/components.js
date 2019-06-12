import styled from 'vue-styled-components'
import { BaseButton } from '@/UiComponents/Buttons'

export const TabLabel = styled(BaseButton)`
  width: 21.8rem;
  height: 5.4rem;
  line-height: 2.4rem;
  font-size: 2rem;
  color: ${props => props.theme.middleGray};
  background-color: ${props => props.theme.mainGray};
  margin-right: 1rem;
  transition-property: color, background-color;
  &.current {
    background-color: ${props => props.theme.mainGold};
    color: ${props => props.theme.white};
  }
  &:hover {
    color: ${props => props.theme.white};
  }
`
