import { useState } from "react";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../redux/cartReducer.js";
import { BsTrash } from "react-icons/bs";
import { NavLink } from "react-router-dom";

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

const Trash = styled.span`
  display: flex;
  font-size: 14px;
  align-items: center;
  justify-content: center;
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  color: #a6a6a6;
`;

const Description = styled.p`
  padding-bottom: 10px;
`;
const SelectedSize = styled.p`
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
`;

const Price = styled.span``;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Amount = styled.h1``;

const CartSlideItem = ({ id, title, desc, price, img, quantity, size }) => {
  const products = useSelector((state) => state.cart.products);

  const dispatch = useDispatch();

  return (
    <CartSlideItemContent>
      <NavLink to={`/product/${id}`}>
        <Image src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + img} />
      </NavLink>
      <Details>
        <ProductTitle>{title}</ProductTitle>
        <Description>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur,
          enim?
        </Description>
        <SelectedSize>Size: {size}</SelectedSize>
        <CounterContainer>
          <CounterLeft>
            <Remove
              onClick={() => {
                if (quantity === 1) {
                  dispatch(removeItem({ size }));
                  return;
                }
                dispatch(decrement({ size }));
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
              onClick={() => dispatch(increment({ size }))}
            />
          </CounterLeft>
          <Trash
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(removeItem({ size }))}
          >
            <BsTrash />
          </Trash>
          <Price>
            {quantity} x{" "}
            {new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(price.toFixed(2))}{" "}
            €
          </Price>
        </CounterContainer>
      </Details>
    </CartSlideItemContent>
  );
};

export default CartSlideItem;
