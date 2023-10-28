import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 20px;
  width: 33.33%;
  background-color: white;
`;

const ErrorMessage = styled.p``;

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
  background-color: lightgray;
  color: white;
  cursor: pointer;
  width: 100%;
  font-size: 18px;
  font-weight: 800;
`;

//TODO focus input color #E8F0FE

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, pwd, email, matchPwd]);

  return (
    <Container>
      <Wrapper>
        <ErrorMessage
          ref={errRef}
          className={errMsg ? "errMsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </ErrorMessage>
        <Title>Create an account</Title>
        <Form>
          <InputWrapper>
            <InputContainer>
              <Label htmlFor="firstName">First name*</Label>
              <Input
                type="text"
                id="firstName"
                placeholder="First name"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
                required
                aria-invalid={validFirstName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setFirstNameFocus(true)}
                onBlur={() => setFirstNameFocus(false)}
              />
            </InputContainer>
            <Requirements
              id="uidnote"
              className={
                firstNameFocus && firstName && !validFirstName
                  ? "instructions"
                  : "offscreen"
              }
            >
              4 to 24 characters. Must begin with a letter. <br />
              Letters, numbers, underscores, hyphens allowed.
            </Requirements>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Last name*</Label>
              <Input placeholder="Last name" />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Email address*</Label>
              <Input placeholder="Email address" />
            </InputContainer>
          </InputWrapper>
          <InputWrapper>
            <InputContainer>
              <Label>Password*</Label>
              <Input placeholder="Password" />
            </InputContainer>
          </InputWrapper>
          <Agreement>
            By registering for an account, you agree to our <b>Terms of Use</b>.
            Please read our <b>Privacy Notice.</b>
          </Agreement>
          <Button>Register</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
