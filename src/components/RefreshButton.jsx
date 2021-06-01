import styled from 'styled-components'
import { Button } from 'react-bootstrap'
import { ArrowRepeat } from 'react-bootstrap-icons'

export const RefreshButton = ({ onClick }) => (
  <RefreshButtonWrapper variant="link" onClick={onClick}>
    <IconWrapper color="primary" />
    Refresh
  </RefreshButtonWrapper>
)

const RefreshButtonWrapper = styled(Button)`
  display: flex;
  align-items: center;
`

const IconWrapper = styled(ArrowRepeat)`
  margin-right: 10px;
`
