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

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>Create an account</Title>
        <Form>
          <InputWrapper>
            <InputContainer>
              <Label>First name*</Label>
              <Input placeholder="First name" />
            </InputContainer>
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
