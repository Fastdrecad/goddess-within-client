import { Badge } from "@material-ui/core";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { phone } from "../responsive";

const Container = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #000000;
  margin-bottom: 30px;
`;

const SecondImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
`;

const ImageContainer = styled.div`
  width: 280px;
  aspect-ratio: 0.7;
  overflow: hidden;
  position: relative;

  &:hover {
    ${SecondImage} {
      z-index: 2;
    }
  }

  ${phone({ width: "150px" })}
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: 1;
`;

const Deal = styled.span`
  position: absolute;
  top: 35px;
  right: 0px;
  background-color: #dd0000;
  color: #ffffff;
  padding: 3px 5px;
  z-index: 3;
  font-weight: 800;
  font-size: 13px;
`;

const Season = styled.span`
  position: absolute;
  top: 10px;
  right: 0;
  background-color: white;
  color: black;
  padding: 3px 5px;
  z-index: 3;
  font-weight: 800;
  font-size: 13px;
`;

const TitleContainer = styled.div`
  color: ${(props) => props.$clr};
  width: 280px;

  ${phone({ width: "150px" })}
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  display: block;

  ${phone({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  })}
`;

const Originally = styled.h3`
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;

  ${phone({ flexDirection: "column" })}
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;

  ${phone({ fontSize: " 14px " })}
`;

const Discount = styled.span`
  color: red;
  text-decoration: none;
  font-size: 15px;

  ${phone({ fontSize: " 14px " })}
`;

const Price = styled.h3`
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;

  ${phone({ fontSize: " 14px " })}
`;

const Like = styled.span`
  position: absolute;
  top: 0px;
  left: 0px;
  background-color: white;
  padding: 12px 8px;
  cursor: pointer;
  z-index: 11;
  transition: all 0.2s linear;

  &:hover {
    background-color: #c0c0c0;
    color: white;
    fill: black;
  }

  ${phone({ padding: " 7px 5px" })}
`;

const Card = ({ item, type, id }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likedItems, setLikedItems] = useState([]);

  const handleLike = () => {
    let currentLikedItems = likedItems;
    if (!isLiked) {
      setIsLiked(true);
      if (currentLikedItems.includes(id))
        setLikedItems([...currentLikedItems, id]);
    } else {
      setIsLiked(false);
      if (currentLikedItems.includes(id))
        setLikedItems(currentLikedItems.filter((item) => item !== id));
    }
  };

  return (
    <Container>
      <Like onClick={handleLike}>
        <Badge color="secondary" overlap="rectangular">
          {isLiked ? (
            <BsHeartFill style={{ fontSize: "25px", fill: "red" }} />
          ) : (
            <BsHeart style={{ fontSize: "25px" }} />
          )}
        </Badge>
      </Like>
      <Link
        to={`/product/${item.id}`}
        style={{
          color: "black",
          textDecoration: "none",
          zIndex: "10",
        }}
      >
        <Wrapper>
          <ImageContainer>
            {item?.attributes.isDeal && <Deal>Deal</Deal>}
            {item?.attributes.isNew && <Season>New</Season>}

            <MainImage
              src={
                import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                item.attributes?.img?.data?.attributes?.formats?.large?.url
              }
            />
            <SecondImage
              src={
                import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                item.attributes?.img2.data?.attributes?.formats?.large?.url
              }
            />
          </ImageContainer>
          <TitleContainer
            $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}
          >
            <Title>{item?.attributes.title}</Title>

            <Title>{item?.attributes.description}</Title>
          </TitleContainer>
          {item?.attributes.discount ? (
            <Price style={{ color: "red" }}>
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item?.attributes.price)}{" "}
              €
            </Price>
          ) : (
            <Price $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(item?.attributes.price)}{" "}
              €
            </Price>
          )}
          {item?.attributes.discount && (
            <Originally $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
              <OriginalPrice>
                Originally:{"  "}
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(
                  Math.floor(
                    (item?.attributes.price /
                      (1 - item?.attributes.discount / 100)) *
                      100
                  ) / 100
                )}
                €
              </OriginalPrice>
              <Discount>-{item?.attributes.discount}%</Discount>
            </Originally>
          )}
        </Wrapper>
      </Link>
    </Container>
  );
};

export default Card;
