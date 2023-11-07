import { Badge } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BsHeart } from "react-icons/bs";
import { PiGlobeLight } from "react-icons/pi";
import { GoPerson } from "react-icons/go";
import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import CartSlide from "./CartSlide";
import ProfileTab from "./ProfileTab";
import { useSelector } from "react-redux";
import { MenuContext } from "../context/navContext";
import { useContext } from "react";

const Container = styled.div`
  height: 90px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: sticky;
  top: 32px;
  z-index: 100;
  background-color: white;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavbarLink = styled(NavLink)`
  color: black;
  position: relative;
  border: none;
  text-decoration: none;

  &.active {
    padding-bottom: 4px;
    border-bottom: 3px solid black;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-inline: 10px;
  cursor: pointer;
`;

const MenuItem = styled.span`
  font-size: 15px;
  margin-inline: 18px;
  cursor: pointer;
`;
const MenuItemPerson = styled.span`
  font-size: 15px;
  margin-inline: 18px;
  cursor: pointer;
  padding: 5px;
  z-index: 5;
  background-color: white;
  border: 2px solid transparent;
  border-bottom: none;

  &.active {
    border: 2px solid black;
    border-bottom: none;
  }
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-family: "TheQueenthine";
  cursor: pointer;
  font-weight: 500;
  font-size: 40px;
  display: inline;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  margin-inline: 18px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
`;

const Navbar = () => {
  const { toggle, menuOpen } = useContext(MenuContext);
  const [active, setActive] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsHovering(!isHovering);
    }, 100);
    clearTimeout(handleMouseLeave);
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            <NavbarLink
              to="/"
              onClick={() => setActive(!active)}
              className={`${active} ? "active" : "`}
            >
              New Arrivals
            </NavbarLink>
          </MenuItem>
          <MenuItem>
            <NavbarLink to="/products/1">Ready to wear</NavbarLink>
          </MenuItem>
          <MenuItem>
            <NavbarLink to="/products/2">Beauty</NavbarLink>
          </MenuItem>
          <MenuItem>
            <NavbarLink to="/products/3">Sale %</NavbarLink>
          </MenuItem>
        </Left>
        <Center>
          <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
            <Logo>Goddess Within</Logo>
          </NavLink>
        </Center>
        <Right>
          <LanguageContainer>
            <Language>EN</Language>
            <PiGlobeLight style={{ fontSize: "30px" }} />
          </LanguageContainer>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{ color: "#333", fontSize: "30px", userSelect: "none" }}
            />
          </SearchContainer>
          <MenuItemPerson
            onMouseEnter={() => setIsHovering(!isHovering)}
            className={`${isHovering ? "active" : ""}`}
          >
            <Badge color="secondary" overlap="rectangular">
              <GoPerson style={{ fontSize: "25px" }} />
            </Badge>
          </MenuItemPerson>
          <MenuItem>
            <Badge
              color="secondary"
              overlap="rectangular"
              // badgeContent={products.length}
            >
              <BsHeart style={{ fontSize: "25px" }} />
            </Badge>
          </MenuItem>
          <MenuItem>
            <Link to="/cart">
              <Badge
                badgeContent={products.length}
                color="secondary"
                overlap="rectangular"
              >
                <HiOutlineShoppingBag
                  style={{ fontSize: "25px" }}
                  color="action"
                  onMouseEnter={() => {
                    toggle();
                  }}
                />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
      {isHovering && (
        <ProfileTab setIsHovering={setIsHovering} isHovering={isHovering} />
      )}
    </Container>
  );
};

export default Navbar;
