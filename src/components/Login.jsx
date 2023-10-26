import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 33.33%;
  background-color: white;
`;

const Title = styled.h3`
  font-family: "HelveticaNowText-Bold";
  font-size: 28px;
  font-weight: 600;
  padding-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  padding-bottom: 20px;
  flex: 1;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.label`
  font-family: "HelveticaNowText-Light";

  font-size: 12px;
  align-self: flex-start;
  padding: 4px 8px;
  border: 1px solid black;
  border-bottom: none;
`;

const Input = styled.input`
  border: 1px solid black;
  min-width: 40%;
  padding: 10px 12px;

  &::placeholder {
    color: #aeaeae;
  }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: lightgray;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  font-weight: 800;
  margin: 10px 0;
  &:disabled {
    color: red;
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0;
  text-decoration: underline;
  cursor: pointer;
  color: #6328e0;
  font-weight: 800;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   login(dispatch, { username, password });
  // };

  const Error = styled.span`
    color: red;
  `;

  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Form>
          <InputWrapper>
            <InputContainer>
              <Label>Username*</Label>
              <Input
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Password*</Label>
              <Input
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputContainer>
          </InputWrapper>
          <Button onClick={handleClick} disabled={isFetching}>
            Login
          </Button>
          {error && <Error>Something went wrong...</Error>}
          <Link>Forgotten your password?</Link>
          <Link>Create a new account</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
