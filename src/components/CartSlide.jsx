import ReactDOM from "react-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import CartSlideItem from "./CartSlideItem";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../requestMethods";
import { useContext } from "react";
import { MenuContext } from "../context/navContext";

const ContainerBackground = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;
`;

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  width: 400px;
  right: -400px;
  padding: 0 26px 24px;
  top: 0;
  bottom: 0;
  max-width: 95%;
  color: black;
  background-color: white;
  transition: all 800ms ease;
  opacity: 1;
  z-index: 9999;

  &.isOpen {
    transform: translateX(-400px);
    opacity: 1;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 0;
`;

const Title = styled.h1`
  font-size: 24px;
  text-transform: uppercase;
`;
const Button = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  font-size: 30px;
  cursor: pointer;
`;
const DrawerBody = styled.div`
  position: absolute;
  margin-top: 30px;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px 20px 0;
`;
const CartContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DrawerInner = styled.div`
  /* display: flex; */
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
`;

const ContainerItem = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-height: 60vh;
  flex-wrap: nowrap;
  scroll-behavior: smooth;
  overflow-y: scroll;
  list-style: none;

  &::-webkit-scrollbar {
    display: none;
    position: relative;
  }
`;

const CartSlideList = styled.li``;

const Image = styled.img`
  flex: 1;
  display: block;
  margin: 0 auto;
  width: 80px;
  height: 100px;
  object-fit: cover;
  object-position: top;
`;
const Details = styled.div`
  flex: 3;
`;
const ProductTitle = styled.h1`
  margin-bottom: 20px;
`;
const CounterLeft = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30%;
  margin: 20px 0;
`;
const Description = styled.p``;

const Price = styled.span`
  /* flex: 70%; */
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Amount = styled.h1``;

const Total = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  right: 0;
  border-top: 1px solid lightgray;
  min-height: 150px;
  height: 250px;
  width: 100%;
  bottom: 0;
  padding: 30px 24px 26px;
  z-index: 3;
  background-color: white;
`;

const TotalCost = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const Subtotal = styled.span`
  font-weight: bold;
  text-transform: uppercase;
  /* padding: 20px 0; */
`;
const Cost = styled.span`
  font-weight: bold;
`;
const CheckoutButton = styled.button`
  width: 100%;
  border: none;
  font-size: 14px;
  padding: 14px 0;
  color: white;
  background-color: black;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const CartSlide = ({ onClose, showCartSlide }) => {
  const handleMouseLeave = () => {
    setTimeout(() => {
      onClose();
    }, 600);
    clearTimeout(handleMouseLeave);
  };

  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51O2q5XFCjM1k0EDke6T3tMGgH1PtZ18VretDYLncIwwkCBBO3k5apeH8ojAT7wi2KburwOaozi8VEAhMyXvrimoO00QysDU0Aw"
  );

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // todo Empty the BAG after checkout
  const handleClick = () => {
    const handlePayment = async () => {
      try {
        const stripe = await stripePromise;
        const res = await makeRequest.post("/orders", {
          products,
        });

        await stripe.redirectToCheckout({
          sessionId: res.data.stripeSession.id,
        });
      } catch (err) {
        console.log(err);
      }
    };
    handlePayment();
  };

  return ReactDOM.createPortal(
    <>
      <ContainerBackground onClick={onClose} />
      <Container
        className={`${showCartSlide ? "isOpen" : ""}`}
        onMouseLeave={handleMouseLeave}
      >
        <Header>
          <Title>Your cart</Title>
        </Header>
        <DrawerBody>
          <CartContainer>
            <DrawerInner>
              <ContainerItem>
                {products?.map((item) => (
                  <CartSlideList key={new Date().getTime + Math.random()}>
                    <CartSlideItem
                      id={item.id}
                      title={item.title}
                      desc={item.desc}
                      price={item.price}
                      img={item.img}
                      quantity={item.quantity}
                      size={item.size}
                    />
                  </CartSlideList>
                ))}
              </ContainerItem>
            </DrawerInner>

            <Total>
              <TotalCost>
                <Subtotal>subtotal</Subtotal>
                <Cost> {totalPrice()} €</Cost>
              </TotalCost>
              <NavLink to="/cart">
                <CheckoutButton>go to checkout</CheckoutButton>
              </NavLink>
            </Total>
          </CartContainer>
        </DrawerBody>
      </Container>
    </>,
    document.querySelector(".modalContainer")
  );
};

export default CartSlide;
