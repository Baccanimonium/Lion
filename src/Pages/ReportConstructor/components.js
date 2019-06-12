import styled from 'vue-styled-components'

export const ContentWrapper = styled.div`
  border: 1px solid ${props => props.theme.middleGray};
  border-radius: ${({ theme: { borderRadius } }) => `0 ${borderRadius} ${borderRadius} ${borderRadius}`};
  height: 100%;
  display: grid;
  grid-template-columns: 218px 1fr;
`

export const SidebarWrapper = styled.div`
  border-radius: ${props => ` 0 0 0 ${props.theme.borderRadius}`};
  background-color: ${props => props.theme.backgroundGray};
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
