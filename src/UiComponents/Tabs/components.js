import styled from 'vue-styled-components'
import { BaseButton } from '@/UiComponents/Buttons'

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
`

export const TabsHeaderWrapper = styled.div`
  width: 100%;
  height: 5.4rem;
  flex: 0 1 auto;
  overflow: hidden;
`
export const TabsHeadersContainer = styled.div`
  position: relative;
  display: flex;
  white-space: nowrap;
  transition: transform 400ms cubic-bezier(.25,.8,.5,1);
`
export const TabsContentContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid ${props => props.theme.middleGray};
  border-radius: ${({ theme: { borderRadius } }) => `0 ${borderRadius} ${borderRadius} ${borderRadius}`};
  overflow: hidden;
`
export const TabLabel = styled(BaseButton)`
  width: 21.8rem;
  height: 5.4rem;
  line-height: 2.4rem;
  font-size: 2rem;
  color: ${props => props.theme.middleGray};
  background-color: ${props => props.theme.mainGray};
  margin-right: 1rem;
  transition-property: color, background-color;
  transition-timing-function: ease-in-out;
  transition-duration: 250ms;
  border-radius: ${({ theme: { borderRadius } }) => `${borderRadius} ${borderRadius} 0 0`};
  &.current {
    background-color: ${props => props.theme.mainGold};
    color: ${props => props.theme.white};
  }
  &:hover {
    color: ${props => props.theme.white};
  }
`
