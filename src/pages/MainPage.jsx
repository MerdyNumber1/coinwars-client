import styled from 'styled-components'
import { LoginForm } from 'components/forms/LoginForm'
import { Helmet } from 'react-helmet'

export const MainPage = () => (
  <>
    <Helmet>
      <title>Home</title>
    </Helmet>
    <MainPageWrapper>
      <LoginFormWrapper>
        <LoginForm />
      </LoginFormWrapper>
    </MainPageWrapper>
  </>
)

const MainPageWrapper = styled.main`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LoginFormWrapper = styled.section`
  width: 100%;
`
