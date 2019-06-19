import styled from 'vue-styled-components'

export const BaseButton = styled.button`
  cursor: pointer;
  width: 16rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  padding: 0 1.25rem;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.alternativeBackgroundGray};
  border-radius: ${props => props.theme.borderRadius};
  font-weight: 500;
  border: 0;
  transition-property: color, background-color;
  transition-duration: 250ms;
  transition-timing-function: ease-in-out;
  &:hover {
    background-color: ${props => props.theme.hoverGold};
  }
  &:disabled {
    cursor: not-allowed;
  }
`

export const BaseSecondaryButton = styled(BaseButton)`
  background-color: ${props => props.theme.mainGold};
  &:hover {
    background-color: ${props => props.theme.alternativeHoverGold};
  }
`
