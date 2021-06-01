import { ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

export const UserCard = ({ user }) => (
  <UserCardWrapper>{user.name}</UserCardWrapper>
)

const UserCardWrapper = styled(ListGroup.Item)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
