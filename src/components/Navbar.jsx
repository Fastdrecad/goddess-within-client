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
import { phone } from "../responsive";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: sticky;
  z-index: 100;
  background-color: white;

  ${phone({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 0 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${phone({ padding: " 0 10px" })}
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
  padding-bottom: 10px;
  background-color: #ffffff;
  border: 2px solid transparent;
  padding: 10px 5px;
  border-bottom: none;

  &.active {
    padding: 10px 5px 25px;
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
  font-size: 35px;
  display: inline;
  white-space: nowrap;

  /* ${phone({ display: "none" })} */
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

const ProfileContainer = styled.div`
  z-index: 15;
`;

const SearchContainer = styled.div`
  border: 1px solid black;
  display: flex;
  align-items: center;
  margin-inline: 18px;
  padding: 5px;

  ${phone({ display: "none" })}
`;

const InputList = styled.ul`
  list-style: none;
  text-transform: lowercase;
  white-space: nowrap;
`;

const InputListItem = styled.li``;

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
  const [filteredItems, setFilteredItems] = useState([]);

  const [isHovering, setIsHovering] = useState(false);

  console.log(data);

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
      setFilteredItems([]);
    }
  };
  console.log(filteredItems);

  return (
    <Container>
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
          <SearchContainer>
            {/* TODO: searchTerm */}
            <Input
              placeholder="Search"
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Search
              style={{ color: "#333", fontSize: "30px", userSelect: "none" }}
            />
            <InputList>
              {filteredItems?.slice(0, 10).map((item) => (
                <NavLink
                  to={`/product/${item.id}`}
                  onClick={() => setFilteredItems([])}
                >
                  <InputListItem key={item.id}>
                    {item.attributes.description}
                  </InputListItem>
                </NavLink>
              ))}
            </InputList>
          </SearchContainer>
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
      <CSSTransition
        in={showCartSlide}
        timeout={600}
        classNames="modal"
        unmountOnExit
      >
        <CartSlide onClose={handleClose} showCartSlide={showCartSlide} />
      </CSSTransition>
    </Container>
  );
};

export default Navbar;
