import styled from 'vue-styled-components'

import { Input } from '@/UiComponents/Inputs/components'

export const HintArea = styled(Input.withComponent('div'))`
  min-height: 30rem;
  position: relative;
`
export const HintLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: 1rem 1.3rem;
  word-wrap: anywhere;
  color: transparent;
`

export const Hint = styled.div`
  position: absolute;
  word-wrap: normal;
  color: ${props => props.theme.black};
  display: flex;
  flex-direction: column;
  top: 1.2rem;
  left: 0.2rem;
  border: 1px solid ${props => props.theme.middleGray};
  border-radius: ${props => props.theme.borderRadius};
`
const HintItemProps = { last: Boolean }

export const HintItem = styled('button', HintItemProps)`
  cursor: pointer;
  text-align: center;
  width: 12rem;
  background-color: ${props => props.theme.white};
  border: 0;
  border-bottom: ${({ last, theme: { middleGray } }) => last ? 0 : `1px solid ${middleGray}`};
  padding: 0.4rem;
  transition: background-color 250ms ease-in-out;
  text-transform: uppercase;
  &:hover {
    background-color: ${props => props.theme.backgroundGray};
  }
`
