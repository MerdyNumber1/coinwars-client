import styled from 'styled-components'
import { Spinner } from 'react-bootstrap'

const LoadingFallbackWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoadingFallback = (props) => (
  <LoadingFallbackWrapper>
    <Spinner animation="border" {...props} />
  </LoadingFallbackWrapper>
)
