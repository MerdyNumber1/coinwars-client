import { Link } from 'react-router-dom'
import { Navbar, Nav as NavLinks } from 'react-bootstrap'
import styled from 'styled-components'

export const Nav = () => (
  <NavbarWrapper bg="primary" variant="dark">
    <Navbar.Brand as={Link} to="/">
      Coin Wars
    </Navbar.Brand>
    <NavLinks>
      <NavLinks.Link as={Link} to="/">
        Home
      </NavLinks.Link>
      <NavLinks.Link as={Link} to="/help">
        How to play
      </NavLinks.Link>
    </NavLinks>
  </NavbarWrapper>
)

const NavbarWrapper = styled(Navbar)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`
