import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { userData } from "../helpers";

const Container = styled.div`
  width: 335px;
  inset: -2px 0px auto auto;
  position: absolute;
  transform: translate(-160px, 67px);
  transition: all 2s ease;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: white;
  z-index: 4;
`;

const UnorderedList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
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
  display: block;
  display: flex;

  &:hover:not(:first-child) {
    background-color: #eaeaea;
    width: 100%;
  }
`;

const Account = styled.span`
  padding: 16px;
`;

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
};

const ProfileTab = ({ setIsHovering, isHovering }) => {
  const { username } = userData();

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovering(!isHovering);
    }, 100);
    clearTimeout(handleMouseLeave);
  };

  return (
    <Container onMouseLeave={handleMouseLeave}>
      <UnorderedList>
        {!username && (
          <ListItem>
            <NavLink to="/login" style={linkStyle}>
              <Button>Login</Button>
            </NavLink>
          </ListItem>
        )}
        <ListItem>
          <Account>
            <NavLink to="/register">
              <Item>
                Your account{" "}
                {`${!username ? username : username.split(" ")[0]}`}
              </Item>
            </NavLink>
          </Account>
        </ListItem>
        <ListItem>
          <Account>
            <NavLink>
              <Item>Orders</Item>
            </NavLink>
          </Account>
        </ListItem>
        <ListItem>
          <Account>
            <NavLink>
              <Item>Return an item</Item>
            </NavLink>
          </Account>
        </ListItem>
        <ListItem>
          <Account>
            <NavLink>
              <Item>Help & FAQ</Item>
            </NavLink>
          </Account>
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
