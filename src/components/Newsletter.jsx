import { Send } from "@material-ui/icons";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { phone, tabletPort } from "../responsive";

const Container = styled.div`
  margin-top: 75px;
  height: 50vh;
  background-color: #0fe7b8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 45px;
  margin-bottom: 20px;

  ${tabletPort({ fontSize: "26px" })}
  ${phone({ fontSize: "22px" })}
`;
const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px;

  ${tabletPort({ fontSize: "16px", textAlign: "center" })}
`;

const FormContainer = styled.form`
  width: 35%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;

  ${tabletPort({ width: "90%" })}
`;
const Input = styled.input`
  border: none;
  padding-left: 20px;
  font-size: 18px;
  flex: 8;
  outline: none;

  ${tabletPort({ paddingLeft: "10px" })}
  ${phone({ fontSize: "16px" })}
`;
const Button = styled.button`
  box-sizing: border-box;
  border: none;
  flex: 1;
  background-color: #0ba584;
  color: white;
  outline: none;
  cursor: pointer;
  transition: all 300ms ease;

  &:hover {
    background-color: #0ba584;
  }

  &:active {
    border: 1px solid black;
  }
`;

const Success = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const SuccessTitle = styled.span`
  font-size: 120px;
  font-family: "TheQueenthine";
  color: #b6fdbf;
`;
const SuccessDesc = styled.h2`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 25px;
  text-align: center;
`;
const SuccessCall = styled.p`
  color: #ffffff;
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const Newsletter = () => {
  const [success, setSuccess] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  const form = useRef();

  const navigate = useNavigate();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_g788tme",
        "template_w7u6qtb",
        form.current,
        "Fj7G3Ji2yq_cho6WY"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    setEmail("");
    setSuccess(!success);
  };

  return (
    <Container>
      {success ? (
        <Success>
          <SuccessTitle>Congratulations!</SuccessTitle>
          <SuccessDesc>
            Thank you for subscription to our Newsletter!
          </SuccessDesc>
          <SuccessCall>
            Look out for the latest news on your favorite clothes.
          </SuccessCall>
        </Success>
      ) : (
        <>
          <Title>Subscribe to our Newsletter</Title>
          <Description>
            Get timely updates from your favorite products
          </Description>
          <FormContainer onSubmit={sendEmail} ref={form}>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address"
              required
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">
              <Send />
            </Button>
          </FormContainer>
        </>
      )}
    </Container>
  );
};

export default Newsletter;
