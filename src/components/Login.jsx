import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { storeUser } from "../helpers";
import { AiFillCloseCircle } from "react-icons/ai";
import { tabletPort } from "../responsive";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 33.33%;
  background-color: white;

  ${tabletPort({ width: "75%" })}
`;

const Title = styled.h3`
  font-family: "HelveticaNowText-Bold";
  font-size: 28px;
  font-weight: 600;
  padding-bottom: 20px;
`;

const ErrorMessage = styled.p`
  background-color: #e9e9e9;
  padding: 15px 0;
  margin-bottom: 20px;
  font-weight: 200;
  font-family: "HelveticaNowText-Light";
  display: flex;
  align-items: center;
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
  background-color: #000000;
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

const linkStyle = {
  margin: "5px 0",
  textDecoration: "underline",
  cursor: "pointer",
  color: "#6328e0",
  fontWeight: 800,
};

const Error = styled.span`
  color: red;
`;

const style = {
  fontSize: "1.5rem",
  color: "red",
  marginLeft: "20px",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const initialUser = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useState(initialUser);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          console.log("You are logged in successfully!");
          setUser(initialUser);
          navigate("/");
        }
      }
    } catch (err) {
      setErr(err.response.data.error.message);
    }
  };

  console.log(err);
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>

        {err && (
          <ErrorMessage>
            <AiFillCloseCircle style={style} />
            {err}
          </ErrorMessage>
        )}
        <Form>
          <InputWrapper>
            <InputContainer>
              <Label>Username*</Label>
              <Input
                type="email"
                name="identifier"
                value={user.identifier}
                placeholder="Email address"
                onChange={handleChange}
              />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Password*</Label>
              <Input
                placeholder="Password"
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
              />
            </InputContainer>
          </InputWrapper>
          <Button onClick={handleLogin}>Login</Button>
          {/* {err && <Error>Something went wrong...</Error>} */}
          <NavLink to="" style={linkStyle}>
            Forgotten your password?
          </NavLink>
          <NavLink to="/register" style={linkStyle}>
            Create a new account
          </NavLink>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
