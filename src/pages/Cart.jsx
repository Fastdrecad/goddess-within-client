import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { BsHeartFill, BsTrash } from "react-icons/bs";
import FeaturedProducts from "../components/FeaturedProducts";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartItem from "../components/CartItem";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../requestMethods";

const Container = styled.section``;

const Wrapper = styled.div`
  max-width: 1200px; // responsive unit
  display: flex;
  margin: 0 auto;
  height: fit-content;
  background-color: #f3f3f3;
  padding: 20px;
`;

const Left = styled.div`
  padding: 20px;
  background-color: white;
  margin-right: 20px;
  flex: 2;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 25px;
`;

const TopTexts = styled.div`
  padding: 25px 20px 0 0;
  font-size: 14px;
`;

const Right = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  height: fit-content;
  flex: 1;
  position: sticky;
  top: 0;
`;

const Info = styled.div``;

const Product = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductDetail = styled.div`
  display: flex;
  flex: 2;
`;

const Image = styled.img`
  width: 100px;
  height: 140px;
  object-fit: cover;
`;

const Details = styled.div`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: 200;
  font-size: 14px;
`;

const ProductId = styled.span`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
`;

const ProductColorContainer = styled.div`
  display: flex;
`;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgr};
`;

const ProductSize = styled.span`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
  text-transform: capitalize;
`;

const Bin = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a6a6a6;
  padding: 15px 0;
`;

const Trash = styled.span`
  font-size: 14px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  border-right: 1px solid gray;
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
`;

const Heart = styled.span`
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-size: 14px;
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
`;

const PriceDetail = styled.span`
  display: flex;
  align-items: end;
  justify-content: space-around;
  flex-direction: column;
  flex: 1;
`;

const ProductAmountContainer = styled.div`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  margin: 10px;
  text-align: center;
  width: 12px;
  border: 1px solid transparent;
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 18px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 2px;
`;

const Summary = styled.div`
  flex: 1;
`;

const SummaryTitle = styled.h1`
  font-weight: 600;
  font-size: 25px;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.$type === "total" && "500"};
  font-size: ${(props) => props.$type === "total" && "24px"};
`;

const SummaryItemText = styled.span`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
`;

const SummaryItemPrice = styled.span`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 14px;
`;

const Button = styled.button`
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  width: 100%;
  padding: 12px;
  background-color: black;
  color: white;
  font-size: 14px;

  &:active {
    background-color: green;
  }
`;

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => (total += item.quantity * item.price));
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_51O2q5XFCjM1k0EDke6T3tMGgH1PtZ18VretDYLncIwwkCBBO3k5apeH8ojAT7wi2KburwOaozi8VEAhMyXvrimoO00QysDU0Aw"
  );

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

  return (
    <Container>
      <Wrapper>
        <Left>
          <Title>Your bag</Title>
          <TopTexts>Parcel will be delivered by GODDESS WITHIN</TopTexts>
          <Info>
            <Product>
              {products?.map((item) => (
                <CartItem
                  key={new Date().getTime + Math.random()}
                  id={item.id}
                  title={item.title}
                  desc={item.desc}
                  price={item.price}
                  img={item.img}
                  quantity={item.quantity}
                />
              ))}
            </Product>
          </Info>
        </Left>

        <Right>
          <Summary>
            <SummaryTitle>Order summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{totalPrice()} €</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>€ 5.99 €</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>-5.99 €</SummaryItemPrice>
            </SummaryItem>
            <Hr />
            <SummaryItem $type="total">
              <SummaryItemText>
                <b>Total (VAT included)</b>
              </SummaryItemText>
              <SummaryItemPrice>
                <b>{totalPrice()} €</b>
              </SummaryItemPrice>
            </SummaryItem>
            <Button onClick={handleClick}>Checkout now</Button>
          </Summary>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Cart;
