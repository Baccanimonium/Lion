import styled from 'vue-styled-components'

export const ContentWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 1.4rem 1rem;
  background-color: ${props => props.theme.lightGray};
  border-radius: ${props => props.theme.borderRadius};
`
