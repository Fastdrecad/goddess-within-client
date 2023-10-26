import Register from "./Register";
import Login from "./Login";
import styled from "styled-components";

const Container = styled.div``;

const Top = styled.div`
  padding: 16px 24px 24px;
  margin-inline: auto;
  max-width: 1400px; // TODO responsive
`;

const Header = styled.div`
  justify-content: space-between;
  align-items: center;
  display: flex;
`;

const Left = styled.div``;

const Logo = styled.h1`
  font-family: "TheQueenthine";
  font-weight: 500;
  font-size: 35px;
  cursor: pointer;
`;

const Right = styled.div``;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const RegisterLogin = () => {
  return (
    <Container>
      <Top>
        <Header>
          <Left>
            <Logo>Goddess Within</Logo>
          </Left>
          <Right>
            <Language>EN</Language>
          </Right>
        </Header>
      </Top>
      <Login />
      <hr />
      <Register />
    </Container>
  );
};

export default RegisterLogin;
