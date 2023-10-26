import styled from "styled-components";
import Card from "./Card";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import useFetch from "../hooks/useFetch";

const Container = styled.div`
  background-color: ${(props) => props.$bgr};
  margin: 100px 0;
`;

const Wrapper = styled.div`
  padding: 40px 0;
  overflow: hidden;
`;

const Top = styled.div`
  padding: 0 100px;
  display: flex;
  align-items: center;
  margin-bottom: 50px;
`;
const Title = styled.h1`
  flex: 2;
  text-transform: capitalize;
  font-size: 22px;
  color: #ffffff;
`;
const Desc = styled.p`
  color: #ffffff;
  flex: 3;
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
`;

const Row = styled.div`
  top: 40%;
  z-index: 1;
`;
const ColLeft = styled.div`
  position: absolute;
  left: 30rem;
  top: 39%;
`;

const ColRight = styled.div`
  top: 39%;
  position: absolute;
  right: 30rem;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  background-color: #ffffff;
  cursor: pointer;
`;

const CardList = styled.li`
  flex-basis: 25%;
  /* max-width: 25%; */
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

  // console.log(data);

  return (
    <Container $bgr={`${type === "featured" ? "#6547b2" : "gray"}`}>
      <Wrapper>
        <Top>
          <Title>{type} products</Title>
          <Desc>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            voluptates ad unde tenetur tempore placeat laudantium, rerum
            eligendi minus asperiores autem corrupti non explicabo reiciendis
            culpa. Voluptas, quis neque? Id. Natus, quia quam culpa voluptas
            error rem delectus magni aspernatur sed, magnam nobis officia
            deleniti unde. Veniam omnis magnam, possimus in, a harum aliquid
            tempore deserunt architecto incidunt facere consequatur!
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
                    <Card item={item} />
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
