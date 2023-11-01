import { Badge } from "@material-ui/core";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { like } from "../redux/wishReducer";

const Container = styled.div`
  display: flex;
  position: relative;
  align-self: flex-start;
`;

const Wrapper = styled.div`
  width: 280px;
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
  width: 100%;
  height: 400px;
  overflow: hidden;
  position: relative;

  &:hover {
    ${SecondImage} {
      z-index: 2;
    }
  }
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

const Title = styled.h2`
  font-size: 14px;
  font-weight: 400;
  color: ${(props) => props.$clr};
`;

const Originally = styled.h3`
  color: ${(props) => props.$clr};
  /* font-weight: 400; */
  display: flex;
  gap: 20px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
`;

const Discount = styled.span`
  color: red;
  text-decoration: none;
  font-size: 15px;
`;

const Price = styled.h3`
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;
`;

const Like = styled.span`
  position: absolute;
  top: 2px;
  left: 2px;
  background-color: white;
  padding: 12px 8px;
  cursor: pointer;
  z-index: 30;
  transition: all 0.2s linear;

  &:hover {
    background-color: #c0c0c0;
    color: white;
    fill: black;
  }
`;

const Card = ({ item, type, id, isLiked, res }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.wish);

  return (
    <Container>
      <Like onClick={() => dispatch(like({ id, res }))}>
        <Badge color="secondary" overlap="rectangular">
          {!item.isLiked ? (
            <BsHeart style={{ fontSize: "25px" }} />
          ) : (
            <BsHeartFill style={{ fontSize: "25px", fill: "red" }} />
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
                item.attributes?.img?.data?.attributes?.url
              }
            />
            <SecondImage
              src={
                import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                item.attributes?.img2.data?.attributes?.url
              }
            />
          </ImageContainer>
          <Title $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
            {item?.attributes.title}
            <br />
            {item?.attributes.desc}
          </Title>
          {item?.attributes.discount ? (
            <Price style={{ color: "red" }}>{item?.attributes.price} €</Price>
          ) : (
            <Price $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
              {item?.attributes.price} €
            </Price>
          )}
          {item?.attributes.discount && (
            <Originally $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
              <OriginalPrice>
                Originally:{"  "}
                {Math.floor(
                  (item?.attributes.price /
                    (1 - item?.attributes.discount / 100)) *
                    100
                ) / 100}
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
