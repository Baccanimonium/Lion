import styled from 'vue-styled-components'
import { BaseButton } from '@/UiComponents/Buttons'

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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  grid-gap: 1rem;
  padding: 1rem;
`
