import { Email, Facebook, Instagram, Phone, Room } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { laptop, phone, tabletLand } from "../responsive";

const Container = styled.div`
  display: flex;
  margin: auto;
  background-color: #1a1a1a;
  color: white;
  padding: 50px 80px;

  ${phone({
    padding: "10px 20px",
    flexDirection: "column",
    alignItems: "center",
  })}

  ${tabletLand({
    padding: "10px 20px",
    flexDirection: "column",
    alignItems: "center",
  })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;

  ${phone({
    padding: "0",
    paddingBottom: "15px",
    alignItems: "center",
    borderBottom: "1px solid white",
  })}
`;

const Logo = styled.h1`
  font-family: "TheQueenthine";
  font-weight: 400;
  font-size: 40px;

  ${phone({ fontSize: "28px" })}
`;

const Desc = styled.p`
  margin: 20px 0;
  ${phone({ display: "none" })}
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-inline: 5px;
  border: 1px solid transparent;
  border-radius: 50%;
  padding: 7px;
  cursor: pointer;

  ${phone({ flexDirection: "column" })}

  &:hover {
    border: 1px solid gray;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;

  ${phone({ display: "none" })}

  ${laptop({ alignSelf: "flex-start" })}
`;

const Title = styled.h3`
  margin: 0;
  margin-bottom: 30px;

  ${phone({ marginBottom: "20px" })}
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  white-space: nowrap;

  ${laptop({ width: "50%" })}

  ${tabletLand({ width: "50%" })}
`;

const Right = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;

  ${phone({ padding: "0px", marginTop: "20px" })}
`;

const ContactItem = styled.div`
  font-weight: 400;
  margin: 5px 0;
  display: flex;
  align-items: center;
`;
const PaymentItem = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Payment = styled.img`
  width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Goddess Within</Logo>
        <Desc>
          Fashion is not something that exists in dresses only. Fashion is in
          the sky, in the street; fashion has to do with ideas, the way we live,
          what is happening.
        </Desc>
        <SocialContainer>
          <Link target="_blank" to={"https://www.facebook.com/"}>
            <SocialIcon color="3B5999">
              <Facebook style={{ fontSize: "40px" }} />
            </SocialIcon>
          </Link>
          <Link target="_blank" to={"https://www.instagram.com/"}>
            <SocialIcon color="E4405F">
              <Instagram style={{ fontSize: "40px" }} />
            </SocialIcon>
          </Link>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem> Home</ListItem>
          <ListItem> Cart</ListItem>
          <ListItem> Man Fashion</ListItem>
          <ListItem> Woman Fashion</ListItem>
          <ListItem> Accessories</ListItem>
          <ListItem> Mt Account</ListItem>
          <ListItem> Order Tracking</ListItem>
          <ListItem> Wishlist</ListItem>
          <ListItem> Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "15px" }} />
          334 Corny Path, North Griffins 39956
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: "15px" }} />
          +1 111 11 11
        </ContactItem>
        <ContactItem>
          <Email style={{ marginRight: "15px" }} />
          contact@goddess.within
        </ContactItem>
        <PaymentItem>
          <Payment src="/assets/payments/payment.png" />
        </PaymentItem>
      </Right>
    </Container>
  );
};

export default Footer;
