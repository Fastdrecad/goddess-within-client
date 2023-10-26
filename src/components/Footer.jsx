import { Email, Facebook, Instagram, Phone, Room } from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background-color: #1a1a1a;
  color: white;
  padding: 100px 200px;
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  font-family: "TheQueenthine";
  font-weight: 400;
  font-size: 40px;
`;

const Desc = styled.p`
  margin: 20px 0;
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
  &:hover {
    border: 1px solid gray;
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
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
`;

const Right = styled.div`
  padding: 20px;
  flex: 1;
`;

const ContactItem = styled.div`
  font-weight: 400;
  margin: 10px;
  display: flex;
  align-items: center;
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
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>Mt Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title style={{ marginLeft: "10px" }}>Contact</Title>
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
        <Payment src="/src/assets/payments/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
