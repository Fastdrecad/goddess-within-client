import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { BsHeartFill, BsTrash } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increment, decrement, removeItem } from "../redux/cartReducer.js";

const CartItemContent = styled.div`
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #dddddd;
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
  /* background-color: ${(props) => props.$bgr}; */
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

const ProductAmount = styled.span`
  text-align: center;
  width: 26px;
  border: 1px solid transparent;
  font-family: "HelveticaNowText-Light";
  font-weight: 200;
  font-size: 16px;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

const CartItem = ({ id, title, desc, price, img, quantity, size }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  return (
    <CartItemContent>
      <ProductDetail>
        <Link to={`/product/${id}`}>
          <Image src={import.meta.env.VITE_REACT_APP_UPLOAD_URL + img} />
        </Link>
        <Details>
          <ProductName>
            <span>Product: </span>
            {title}
          </ProductName>
          <ProductId>
            <span>Id: </span>
            {id}
          </ProductId>
          <ProductSize>
            <span>Size: </span>
            {size}
          </ProductSize>
          <Bin>
            <Trash
              style={{ cursor: "pointer" }}
              onClick={() => dispatch(removeItem({ size }))}
            >
              <BsTrash style={{ marginRight: "5px" }} />
              Remove
            </Trash>
            <Heart>
              <BsHeartFill style={{ marginRight: "5px" }} />
              On your wish list
            </Heart>
          </Bin>
        </Details>
      </ProductDetail>
      <PriceDetail>
        <ProductAmountContainer>
          <Remove
            style={{
              fontSize: "12px",
              border: "1px solid #cacaca",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (quantity === 1) {
                dispatch(removeItem({ size }));
                return;
              }
              dispatch(decrement({ size }));
            }}
          />
          <ProductAmount>{quantity}</ProductAmount>
          <Add
            style={{
              fontSize: "12px",
              border: "1px solid #cacaca",
              borderRadius: "50%",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => dispatch(increment({ size }))}
          />
        </ProductAmountContainer>
        <ProductPrice>{price} €</ProductPrice>
      </PriceDetail>
    </CartItemContent>
  );
};

export default CartItem;
