import styled, {keyframes} from 'styled-components'

export const LoadingContainer = styled.div`
  position: fixed;
  top: 10vh;
  width: 20vw;
  height: 6vh;
  left: 40vw;
  z-index: 1000;
  text-align: center;  
`

const loading = keyframes`
  0%, 80%, 100% { 
    transform: scale(0.13);
  } 40% { 
    transform: scale(1.0);
  }
`

function getBackground(store): string{

  return store.message === '' ?
    '#50aa8a' :
    store.message
}

export const LoadingBlockFirst = styled.div`
  width: 6vh;
  height: 6vh;
  background-color: ${getBackground};

  border-radius: 100%;
  border: 3px solid #3985c9;
  display: inline-block;
  animation: ${loading} 1.4s infinite ease-in-out both;
`

export const LoadingBlockSecond = styled(LoadingBlockFirst)`
  animation-delay: 0.16s;
`

export const LoadingBlockThird = styled(LoadingBlockFirst)`
  animation-delay: 0.32s;
`