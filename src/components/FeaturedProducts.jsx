import styled from "styled-components";
import Card from "./Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import useFetch from "../hooks/useFetch";
import { phone } from "../responsive";

const Container = styled.div`
  background-color: ${(props) => props.$bgr};
  margin: 100px 0;

  ${phone({ margin: " 50px 0px" })}
`;

const Wrapper = styled.div`
  padding: 40px 0;
  overflow: hidden;
  ${phone({ padding: " 10px " })}
`;

const Top = styled.div`
  padding: 0 100px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  color: ${(props) => props.$clr};

  ${phone({
    padding: " 10px 10px",
    alignItems: "flex-start",
    marginBottom: "20px",
  })}
`;

const Title = styled.h1`
  flex: 2;
  text-transform: capitalize;
  font-size: 22px;
  padding-right: 10px;
`;

const Desc = styled.p`
  flex: 3;
  ${phone({ fontSize: " 14px " })}
`;
const BottomContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: relative;
`;

const ContainerList = styled.ul`
  display: flex;
  white-space: nowrap;
  scroll-padding-left: 350px;
  scroll-behavior: smooth;
  list-style: none;
  flex-wrap: nowrap;
  overflow-x: scroll;
  transform: translateZ(0);
  padding-left: 200px;
  padding-right: 200px;

  &::-webkit-scrollbar {
    display: none;
    position: relative;
  }

  ${phone({ padding: " 0px 10px" })}
`;

const Row = styled.div`
  top: 40%;
  z-index: 1;
`;
const ColLeft = styled.div`
  position: absolute;
  left: 15vw;
  top: 39%;
`;

const ColRight = styled.div`
  top: 39%;
  position: absolute;
  right: 15vw;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;

const CardList = styled.li`
  flex-basis: 25%;
  padding: 0px 10px;
`;

const FeaturedProducts = ({ type }) => {
  const ref = useRef(null);

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };

  const { ref: ref1, inView: titleIsVisible } = useInView();

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  return (
    <Container $bgr={`${type === "featured" ? "#084D5E" : "#e5b9c7"}`}>
      <Wrapper>
        <Top $clr={`${type === "featured" ? "#ffffff" : "#000000"}`}>
          <Title>{type} products</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            voluptates ad unde tenetur tempore placeat laudantium, rerum
            eligendi minus asperiores autem corrupti non explicabo reiciendis
            culpa.
          </Desc>
        </Top>
        <BottomContainer>
          <ContainerList ref={ref}>
            {error
              ? "Something went wrong!"
              : loading
              ? "loading"
              : data?.map((item, i) => (
                  <CardList key={item.id}>
                    <Card item={item} type={type} />
                  </CardList>
                ))}
          </ContainerList>
          <Row>
            <ColLeft>
              <Button onClick={() => scroll(-800)}>
                <BsArrowLeft style={{ fontSize: "30px" }} />
              </Button>
            </ColLeft>
            <ColRight>
              <Button onClick={() => scroll(800)}>
                <BsArrowRight style={{ fontSize: "30px" }} />
              </Button>
            </ColRight>
          </Row>
        </BottomContainer>
      </Wrapper>
    </Container>
  );
};

export default FeaturedProducts;
