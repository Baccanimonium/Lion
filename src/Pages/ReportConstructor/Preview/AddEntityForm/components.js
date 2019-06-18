import styled from 'vue-styled-components'
import { BaseButton } from '@/UiComponents/Buttons'
import { ContentWrapper as ToggleContainerWrapper } from '@/UiComponents/ToggleContainer/components'

export const NewEntityFormWrapper = styled.div`
  display: grid;
  grid-template-columns: 20rem 1fr;
  grid-column-gap: 2rem;
`
export const AlgebraicSymbolsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: auto 0 2rem;
`
export const AlgebraicLabel = styled(BaseButton)`
  font-weight: 400;
  width: 2.5rem;
  background-color: ${props => props.theme.lightGray};
  color: ${props => props.theme.alternativeBackgroundGray};
  &:hover {
    background-color: ${props => props.theme.boldGray};
    color: ${props => props.theme.white};
  }
`
export const SideBarContainer = styled(ToggleContainerWrapper)`
  height: 100%;
`
