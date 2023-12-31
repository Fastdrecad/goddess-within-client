import styled from "styled-components";
import CarouselItems from "./CarouselItems";
import { sliderItems } from "../data";
import { NavLink } from "react-router-dom";
import { laptop, phone, tabletPort } from "../responsive";

const Container = styled.section`
  background-color: #999d9e;

  ${phone({ display: "none" })}
`;

const Slide = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  position: relative;
  align-items: center;
  background-color: ${(props) => props.$bg};
`;

const ImgContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  width: 60%;
  bottom: 10%;
  right: 0px;
  padding: 50px 70px;
  margin-right: 80px;
  color: white;
  text-align: center;

  ${laptop({ padding: "25px 35px", marginRight: "50px", bottom: "12%" })}
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;

  ${laptop({ fontSize: "30px" })}
  ${tabletPort({ fontSize: "26px" })}
`;

const Desc = styled.p`
  font-size: 30px;
  margin: 30px 0px;
  font-weight: 500;

  ${laptop({ fontSize: "20px", margin: "15px 0" })};
  ${tabletPort({ fontSize: "16px", margin: "10px 0" })};
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: white;
  cursor: pointer;
  outline: none;
  border: 1px solid black;
  text-transform: uppercase;
  white-space: nowrap;
  border: none;

  ${tabletPort({ fontSize: "16px", padding: "10px " })}
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
              <NavLink to={`/products/${item.id}`}>
                <Button>{item.btn}</Button>
              </NavLink>
            </InfoContainer>
          </Slide>
        ))}
      </CarouselItems>
    </Container>
  );
};

export default Carousel;
