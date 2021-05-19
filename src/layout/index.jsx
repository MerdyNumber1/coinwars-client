import { useEffect } from 'react';
import styled from 'styled-components'
import { Container } from 'react-bootstrap'
import { Nav } from 'components/Nav'
import { useUser } from 'hooks/useUser'

const LayoutWrapper = styled(Container)`
  width: 92%;
  max-width: 450px;
  margin: 66px auto;
  height: calc(100vh - 66px * 2);
`;

export const Layout = ({ children }) => {
  const { getCurrentUser, isLogged } = useUser()

  useEffect(() => {
    if (isLogged) {
      getCurrentUser()
    }
  }, [])

  return (
    <>
      <Nav/>
      <LayoutWrapper>{children}</LayoutWrapper>
    </>
  )
}
