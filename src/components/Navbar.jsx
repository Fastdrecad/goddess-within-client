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
import { CSSTransition } from "react-transition-group";
import useFetch from "../hooks/useFetch";
import { phone, tabletLand, tabletPort } from "../responsive";

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  z-index: 100;
  background-color: white;
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  max-width: 1366px;
  margin: auto;
  padding: 0 15px;

  ${phone({ padding: " 0px 10px" })}
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${phone({ padding: " 0px 10px" })}
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

  ${phone({ margin: " 10px 15px" })}
`;

const LanguageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-inline: 10px;
  cursor: pointer;

  ${tabletPort({ display: " none" })}
`;

const MenuItem = styled.span`
  font-size: 15px;
  margin-inline: 18px;
  cursor: pointer;

  ${phone({ marginInline: "6px" })}
`;

const ProfileContainer = styled.div`
  z-index: 15;
  width: 59px;
  display: flex;
  position: relative;
`;

const MenuItemPerson = styled.span`
  font-size: 15px;
  margin: auto;
  cursor: pointer;
  padding-bottom: 10px;
  background-color: #ffffff;
  border: 2px solid transparent;
  padding: 10px 5px;
  border-bottom: none;

  ${tabletPort({ marginInline: "6px" })}

  &.active {
    padding: 10px 5px 17px;
    border: 2px solid black;
    border-bottom: none;

    ${tabletPort({ border: "none" })}
  }

  ${tabletPort({ border: "none" })}
`;

const Center = styled.div`
  flex: 2;
  text-align: center;

  ${tabletLand({ display: "none" })}
`;

const Logo = styled.h1`
  font-family: "TheQueenthine";
  cursor: pointer;
  font-weight: 500;
  font-size: 35px;
  display: inline;
  white-space: nowrap;

  ${phone({ fontSize: "28px" })}
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

  ${phone({ display: "none" })}
`;

const ListContainer = styled.div`
  width: 335px;
  inset: 0px 0px auto auto;
  position: absolute;
  transform: translate(1px, 41px);
  transition: all 2s ease;
  border: 2px solid black;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  z-index: 100;

  ${phone({ width: "300px", left: "50%", transform: "translate(-50%, 41px)" })}
`;

const SearchContainer = styled.div`
  position: relative;
  border: 1px solid black;
  display: flex;
  align-items: center;
  margin-inline: 18px;
  padding: 5px;

  ${phone({ margin: "auto" })}
`;

const InputList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  justify-content: space-evenly;
  flex-direction: column;
  height: 100%;
`;

const InputListItem = styled.li`
  list-style: none;
  border-bottom: 1px solid lightgray;
  display: block;
  width: 95%;
  padding: 16px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
    background-color: #eaeaea;
    width: 100%;
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
`;

const Navbar = () => {
  const { data, loading, error } = useFetch(`/products`);
  const [active, setActive] = useState(false);
  const [showCartSlide, setShowCartSlide] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState(null);

  const [isHovering, setIsHovering] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleMouseEnterBag = () => {
    setShowCartSlide(true);
  };

  const handleClose = () => {
    setShowCartSlide(false);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    const filteredItems = data?.filter((item) =>
      item.attributes.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      setFilteredItems(filteredItems);
    } else {
      setFilteredItems(null);
    }
  };

  return (
    <Container>
      <OuterWrapper>
        <Wrapper>
          <Left>
            <NavLink to="/" style={{ textDecoration: "none", color: "black" }}>
              <Logo>Goddess Within</Logo>
            </NavLink>
          </Left>
          <Center>
            {" "}
            <MenuItem>
              <NavbarLink
                to="/products/1"
                onClick={() => setActive(!active)}
                className={`${active} ? "active" : "`}
              >
                Ready to wear
              </NavbarLink>
            </MenuItem>
            <MenuItem>
              <NavbarLink to="/products/2">New Arrivals</NavbarLink>
            </MenuItem>
            <MenuItem>
              <NavbarLink to="/products/3">Beauty</NavbarLink>
            </MenuItem>
            <MenuItem>
              <NavbarLink to="/products/4">Sale %</NavbarLink>
            </MenuItem>
          </Center>
          <Right>
            <LanguageContainer>
              <Language>EN</Language>
              <PiGlobeLight style={{ fontSize: "30px" }} />
            </LanguageContainer>

            <ProfileContainer
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <MenuItemPerson className={`${isHovering ? "active" : ""}`}>
                <Badge color="secondary" overlap="rectangular">
                  <GoPerson style={{ fontSize: "25px" }} />
                </Badge>
              </MenuItemPerson>
              {isHovering && <ProfileTab />}
            </ProfileContainer>
            <MenuItem>
              <Badge color="secondary" overlap="rectangular">
                <BsHeart style={{ fontSize: "25px" }} />
              </Badge>
            </MenuItem>
            <MenuItem onMouseEnter={handleMouseEnterBag}>
              <Link to="/cart">
                <Badge
                  badgeContent={products.length}
                  color="secondary"
                  overlap="rectangular"
                >
                  <HiOutlineShoppingBag
                    style={{ fontSize: "25px" }}
                    color="action"
                  />
                </Badge>
              </Link>
            </MenuItem>
          </Right>
        </Wrapper>
        <SearchContainer>
          <Input
            placeholder="Search..."
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <Search
            style={{ color: "#333", fontSize: "30px", userSelect: "none" }}
          />
          {searchTerm && (
            <ListContainer>
              <InputList>
                {filteredItems?.slice(0, 10).map((item) => (
                  <NavLink
                    style={{
                      width: "100%",
                      height: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    to={`/product/${item.id}`}
                    onClick={() => {
                      setFilteredItems([]);
                      setSearchTerm("");
                    }}
                  >
                    <InputListItem key={item.id}>
                      {item.attributes.description}
                    </InputListItem>
                  </NavLink>
                ))}
              </InputList>
            </ListContainer>
          )}
        </SearchContainer>
      </OuterWrapper>
      <CSSTransition
        in={showCartSlide}
        timeout={600}
        classNames="transition"
        unmountOnExit
      >
        <CartSlide onClose={handleClose} showCartSlide={showCartSlide} />
      </CSSTransition>
    </Container>
  );
};

export default Navbar;
