import styled from 'vue-styled-components'
import { BaseButton } from '@/UiComponents/Buttons'
import { ContentWrapper as ToggleContainerWrapper } from '@/UiComponents/ToggleContainer/components'

export const ContentWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 218px 1fr;
`

export const SidebarWrapper = styled.div`
  border-radius: ${props => ` 0 0 0 ${props.theme.borderRadius}`};
  background-color: ${props => props.theme.backgroundGray};
  padding: 2.4rem 2rem;
`

export const ResultContainer = styled.div`
  padding: 1.8rem 1.7rem;
`
export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 1rem;
`

export const SelectedFieldsContainer = styled.div`
  min-height: 21rem;
  border: 1px solid ${props => props.theme.mainGray};
  border-radius: ${props => props.theme.borderRadius};
`

const EntityLabelProps = { selected: Boolean }

export const EntityLabel = styled(BaseButton, EntityLabelProps)`
  text-transform: capitalize;
  justify-content: space-between;
  font-weight: 400;
  height: 4rem;
  min-width: 16rem;
  width: 100%;
  background-color: ${({ theme: { boldGray, lightGray }, selected }) => selected ? boldGray : lightGray};
  color: ${({ theme: { alternativeBackgroundGray, white }, selected }) => selected ? white : alternativeBackgroundGray};
  &:hover {
    background-color: ${props => props.theme.boldGray};
    color: ${props => props.theme.white};
  }
`
export const SelectedLabelContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
`

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
