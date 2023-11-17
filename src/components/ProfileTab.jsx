import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userData } from "../helpers";

const Container = styled.div`
  width: 335px;
  inset: 0px 0px auto auto;
  position: absolute;
  transform: translate(-220px, 86px);
  transition: all 2s ease;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  z-index: -1;
`;

const UnorderedList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;

  &:not(:first-child) {
    padding: 16px;
  }
`;

const Button = styled.button`
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

const ListItem = styled.li`
  list-style: none;
  border-bottom: 1px solid lightgray;
  display: block;
  width: 95%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;

  &:hover:not(:first-child) {
    cursor: pointer;
    background-color: #eaeaea;
    width: 100%;
  }
`;

const Account = styled.span``;

const Item = styled.span``;

const Logout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`;
const Description = styled.span`
  color: #920092;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
    border-bottom: 2px solid;
  }
`;

const linkStyle = {
  width: "100%",
  height: "100%",
};

const ProfileTab = () => {
  const { username } = userData();

  return (
    <Container>
      <UnorderedList>
        {!username && (
          <ListItem style={{ padding: "0" }}>
            <NavLink to="/login" style={linkStyle}>
              <Button>Login</Button>
            </NavLink>
          </ListItem>
        )}
        <ListItem>
          <NavLink to="/register" style={linkStyle}>
            <Item>
              Your account {`${!username ? "" : username.split(" ")[0]}`}
            </Item>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink>
            <Item>Orders</Item>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink>
            <Item>Return an item</Item>
          </NavLink>
        </ListItem>
        <ListItem>
          <NavLink>
            <Item>Help & FAQ</Item>
          </NavLink>
        </ListItem>
      </UnorderedList>
      <Logout>
        <NavLink to="/logout">
          <Description>Not you? Log out</Description>
        </NavLink>
      </Logout>
    </Container>
  );
};

export default ProfileTab;
