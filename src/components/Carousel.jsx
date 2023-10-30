import styled from "styled-components";
import CarouselItems from "./CarouselItems";
import { sliderItems } from "../data";
import { NavLink } from "react-router-dom";

const Container = styled.section``;

const Slide = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.$bg};
`;

const ImgContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
`;

const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px 70px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
`;

const Desc = styled.p`
  font-size: 30px;
  margin: 30px 0px;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
  outline: none;
  border: 1px solid black;
`;

const Carousel = () => {
  return (
    <Container>
      <CarouselItems>
        {sliderItems.map((item) => (
          <Slide $bg={item.bg} key={item.id} item={item}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <NavLink to="/products/5">
                <Button>SAVE NOW</Button>
              </NavLink>
            </InfoContainer>
          </Slide>
        ))}
      </CarouselItems>
    </Container>
  );
};

export default Carousel;
