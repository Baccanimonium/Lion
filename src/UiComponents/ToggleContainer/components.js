import styled from 'vue-styled-components'

export const ContentWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  padding: 1.4rem 1rem;
  background-color: ${props => props.theme.mainGray};
  border-radius: ${props => props.theme.borderRadius};
  transition: all 250s ease;
`

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
`

const WrapperProps = { rotated: Boolean }

export const RotateWrapper = styled('div', WrapperProps)`
  transform: rotate(${props => props.rotated ? '180deg' : '0deg'});
  transition: transform ease-in-out 250ms;
`
