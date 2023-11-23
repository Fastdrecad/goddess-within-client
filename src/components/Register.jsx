import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiFillCloseCircle } from "react-icons/ai";
import { tabletPort } from "../responsive";

const Container = styled.section`
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

const ErrorMessage = styled.p`
  background-color: #e9e9e9;
  padding: 15px 0;
  margin-bottom: 20px;
  font-weight: 200;
  font-family: "HelveticaNowText-Light";
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 28px;
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
const Requirements = styled.p`
  font-size: 14px;
  font-weight: 100;
  color: #4d4d4d;
  padding: 5px 0;

  &.instructions {
  }

  &.offscreen {
    position: absolute;
    left: -100vw;
  }
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

const Agreement = styled.span`
  font-size: 16px;
  margin: 20px 0px;
  letter-spacing: 0.5px;
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
`;

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const style = {
  fontSize: "1.5rem",
  color: "red",
  marginLeft: "20px",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const initialUser = { email: "", password: "", username: "" };

const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [err, setErr] = useState(null);

  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:1337/api/auth/local/register`;

      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res) {
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (err) {
      setErr(err.response.data.error.message);
    }
  };

  console.log(err);

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    console.log(name);
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>

        {err && (
          <ErrorMessage>
            <ErrorMessage>
              <AiFillCloseCircle style={style} />
              {err}
            </ErrorMessage>
          </ErrorMessage>
        )}

        <Form>
          <InputWrapper>
            <InputContainer>
              <Label>Username*</Label>
              <Input
                type="text"
                name="username"
                value={user.username}
                onChange={handleUserChange}
                placeholder="Full name"
              />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Email address*</Label>
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleUserChange}
                placeholder="Email address"
              />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Password*</Label>
              <Input
                type="password"
                name="password"
                value={user.password}
                onChange={handleUserChange}
                placeholder="Password"
              />
            </InputContainer>
          </InputWrapper>
          <Agreement>
            By registering for an account, you agree to our <b>Terms of Use</b>.
            Please read our <b>Privacy Notice.</b>
          </Agreement>
          <Button onClick={signUp}>Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
