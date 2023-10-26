import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
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
  font-size: 16px;
  font-weight: 400;
  color: #000000;
`;

const Originally = styled.h3`
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
  color: #000000;
  display: flex;
  gap: 20px;
`;

const Card = ({ item }) => {
  // console.log(item);
  return (
    <Link
      to={`/product/${item.id}`}
      style={{
        color: "black",
        textDecoration: "none",
        alignSelf: "flex-start",
      }}
    >
      <Container>
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
        <Title>{item?.attributes.title}</Title>
        {item?.attributes.discount ? (
          <Price style={{ color: "red" }}>{item?.attributes.price} €</Price>
        ) : (
          <Price>{item?.attributes.price} €</Price>
        )}
        {item?.attributes.discount && (
          <Originally>
            <OriginalPrice>
              Originally:{" "}
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
      </Container>
    </Link>
  );
};

export default Card;
