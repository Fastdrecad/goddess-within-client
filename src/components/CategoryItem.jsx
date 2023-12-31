import styled from "styled-components";
import { Link } from "react-router-dom";
import { phone, tabletLand } from "../responsive";

const Image = styled.img`
  aspect-ratio: 1;
  width: 100%;
  object-fit: cover;
  transition: all 1500ms ease;
`;

const Container = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  line-height: 0;

  &:hover ${Image} {
    transform: scale(1.15);
  }
`;

const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.2);
  transition: all 0.5s ease;

  &:hover {
    opacity: 1;
  }

  ${phone({ opacity: "1" })}
`;

const Title = styled.h1`
  color: white;
  font-size: 24px;
  margin-bottom: 40px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
  outline: none;
  border: none;
  transition: all 0.5s ease;
  text-transform: uppercase;

  &:hover {
    transform: scale(1.1);
  }
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Link to={`/products/${item.id}`}>
        <Image src={item.img} />
        <Info>
          <Title>{item.category}</Title>
          <Button>Shop now</Button>
        </Info>
      </Link>
    </Container>
  );
};

export default CategoryItem;
