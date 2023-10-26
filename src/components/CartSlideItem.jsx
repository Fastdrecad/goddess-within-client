import { useState } from "react";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../redux/cartReducer.js";

const CartSlideItemContent = styled.div`
  display: flex;
  gap: 30px;
  border-bottom: 1px solid lightgray;
`;

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

const CartSlideItem = ({ id, title, desc, price, img, quantity }) => {
  const products = useSelector((state) => state.cart.products);
  console.log(products);

  const dispatch = useDispatch();

  return (
    <CartSlideItemContent>
      <Image src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + img} />
      <Details>
        <ProductTitle>{title}</ProductTitle>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur,
          enim?
        </Description>
        <CounterContainer>
          <CounterLeft>
            <Remove
              onClick={() => {
                if (quantity === 1) {
                  dispatch(removeItem({ id }));
                  return;
                }
                dispatch(decrement({ id }));
              }}
              style={{
                fontSize: "10px",
                padding: "5px",
                borderRadius: "50%",
                border: "1px solid #dedede",
                cursor: "pointer",
              }}
            />
            <Amount>{quantity}</Amount>
            <Add
              style={{
                fontSize: "10px",
                padding: "5px",
                borderRadius: "50%",
                border: "1px solid #dedede",
                cursor: "pointer",
              }}
              onClick={() => dispatch(increment({ id }))}
            />
          </CounterLeft>
          <Price>
            {quantity} x {price} €
          </Price>
        </CounterContainer>
      </Details>
    </CartSlideItemContent>
  );
};

export default CartSlideItem;
