import styled from 'vue-styled-components'

export const DialoueWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
`

export const DialogueArea = styled.div`
  position: absolute;
  height: calc(100% + 50px);
  background-color: #000;
  opacity: 0.2;
  width: 100%;
`

export const DialogueContainer = styled.div`
  background-color: ${props => props.theme.white};
  border-radius: ${props => props.theme.borderRadius};
  z-index: 2;
  display: flex;
  margin-bottom: auto;
  padding: 2rem 1.8rem 4.2rem;
  flex-direction: column;
`

export const ActionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`

export const DialogueHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
