import styled from "styled-components";
import FeaturedProducts from "../components/FeaturedProducts";
import { Add, Remove } from "@material-ui/icons";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import { HiScale } from "react-icons/hi2";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartReducer";

const Container = styled.div`
  font-family: "HelveticaNowText-Regular";
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  margin-inline: auto;
  max-width: 1300px; // TODO responsive
`;
const ImageContainer = styled.div`
  position: sticky;
  align-self: flex-start;
  flex-basis: 60%;
  top: 25px;
`;

const ImageWrapper = styled.div``;

const ProductGallery = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 10px;
`;
const LeftPanelGallery = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    /* outline: 2px solid black; */
  }
  &.active {
    outline: 2px solid black;
  }
`;

const MainImage = styled.div`
  flex: 5;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: zoom-in;

  &:hover {
  }
`;

const InfoContainer = styled.div`
  padding: 0 15px;
  margin-left: 8%;
  flex-basis: 50%;
`;

const BrandName = styled.h1`
  font-size: 30px;
  font-weight: 200;
`;

const Title = styled.h1`
  font-family: "HelveticaNowText-Bold";
  font-size: 34px;
`;
const Desc = styled.p`
  font-family: "HelveticaNowText-Light";
  margin: 20px 0;
  font-size: 16px;
`;
const Price = styled.span`
  font-size: 25px;
  font-weight: 700;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* margin: 20px 0; */
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px 0;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.$bgr};
  margin: 0 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  width: 100%;
  text-transform: uppercase;
  padding: 15px 30px;
`;

const FilterSizeOption = styled.option`
  width: 100%;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  margin: 20px 0;
`;

const Amount = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid transparent;
  margin: 0 5px;
  font-size: 20px;
`;

const BagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  width: 100%;
  padding: 15px 30px;
  border: none;
  background-color: black;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 600;
  color: white;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e7e7e7;
    color: black;
  }
  &:active {
    background-color: #5d9330;
    color: white;
  }
`;

const ButtonHeart = styled.button`
  padding: 10px 15px;
  border: 1px solid black;
  cursor: pointer;
  text-transform: capitalize;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  background-color: white;
  transition: all 0.2s ease;

  &:hover {
    outline: 1px solid black;
    background-color: #e7e7e7;
  }
`;

const Product = () => {
  const id = useParams().id;
  // console.log(id);
  const [selectedImg, setSelectedImg] = useState("img");
  // console.log(selectedImg);
  const [isActive, setActive] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);
  // console.log(data);

  return (
    <Container>
      {loading ? (
        "loading"
      ) : (
        <Wrapper>
          <ImageContainer>
            <ImageWrapper>
              <ProductGallery>
                <LeftPanelGallery>
                  <Img
                    src={
                      import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                      data?.attributes?.img?.data?.attributes?.url
                    }
                    onMouseOver={(e) => {
                      setSelectedImg("img");
                      setActive("img");
                    }}
                    className={` ${isActive === "img" ? "active" : ""}`}
                  />
                  <Img
                    src={
                      import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                      data?.attributes?.img2?.data?.attributes?.url
                    }
                    onMouseOver={(e) => {
                      setSelectedImg("img2");
                      setActive("img2");
                    }}
                    className={` ${isActive === "img2" ? "active" : ""}`}
                  />
                  <Img
                    src={
                      import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                      data?.attributes?.img3?.data?.attributes?.url
                    }
                    onMouseOver={(e) => {
                      setSelectedImg("img3");
                      setActive("img3");
                    }}
                    className={` ${isActive === "img3" ? "active" : ""}`}
                  />
                </LeftPanelGallery>
                <MainImage>
                  <Image
                    src={
                      import.meta.env.VITE_REACT_APP_UPLOAD_URL +
                      data?.attributes?.[selectedImg]?.data?.attributes?.url
                    }
                  />
                </MainImage>
              </ProductGallery>
            </ImageWrapper>
          </ImageContainer>
          <InfoContainer>
            <BrandName>{data?.attributes?.title}</BrandName>
            <Title>{data?.attributes?.desc}</Title>
            <Desc>
              Outer fabric material: 100% acetate <br />
              Fabric: Satin <br /> Care instructions: Dry clean only
            </Desc>
            <Price>{data?.attributes?.price} €</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Color</FilterTitle>
                {/* TODO: FILTER COLOR */}
                {/* {product.color?.map((c) => (
                  <FilterColor $bgr={c} key={c} onClick={() => setColor(c)} />
              ))} */}
              </Filter>
              {/* TODO: FILTER SIZE */}
              <Filter>
                <FilterSize
                // onChange={(e) => setSize(e.target.value)}
                // defaultValue={"placeholder"}
                // name={"Choose your size"}
                >
                  {/* {product.size?.map((s) => (
                  <FilterSizeOption key={s}>
                    {s} Choose your size
                  </FilterSizeOption>
                ))} */}
                  <FilterSizeOption>Choose your size</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              {/* <AmountContainer>
                <Remove
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#e7e7e7",
                    padding: "10px",
                    borderRadius: "50%",
                    fontSize: "18px",
                  }}
                />
                <Amount>{quantity}</Amount>
                <Add
                  onClick={() => setQuantity((prev) => prev + 1)}
                  style={{
                    cursor: "pointer",
                    backgroundColor: "#e7e7e7",
                    padding: "10px",
                    borderRadius: "50%",
                    fontSize: "18px",
                  }}
                  type="button"
                />
              </AmountContainer> */}
              <BagContainer>
                <Button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: data.id,
                        title: data.attributes.title,
                        desc: data.attributes.desc,
                        price: data.attributes.price,
                        img: data.attributes.img.data.attributes.url,
                        quantity,
                      })
                    )
                  }
                >
                  add to bag
                </Button>
                <ButtonHeart
                // onClick={handleClick}
                >
                  <BsHeart style={{ fontSize: "25px" }} />
                </ButtonHeart>
              </BagContainer>
              {/* <BagContainer>
                <Button
                // onClick={handleClick}
                >
                  add to compare
                </Button>
                <ButtonHeart
                //  onClick={handleClick}
                >
                  <HiScale
                    style={{ fontSize: "25px", fontWeight: "lighter" }}
                  />
                </ButtonHeart>
              </BagContainer> */}
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default Product;
