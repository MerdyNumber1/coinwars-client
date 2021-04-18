import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { Nav } from 'components/Nav'

const LayoutWrapper = styled(Container)`
  width: 100%;
  height: 100vh;
`;

export const Layout = ({ children }) => (
  <>
    <Nav />
    <LayoutWrapper>{children}</LayoutWrapper>
  </>
)
