import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import Dropdown from "../components/Dropdown";
import { AiFillCloseCircle } from "react-icons/ai";
import { phone, tabletPort } from "../responsive";

const Container = styled.div`
  font-family: "HelveticaNowText-Regular";
`;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  margin-inline: auto;
  max-width: 1300px;

  ${tabletPort({ padding: " 0px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  position: sticky;
  align-self: flex-start;
  flex-basis: 60%;
  top: 25px;

  ${tabletPort({ position: " static" })}
`;

const ImageWrapper = styled.div`
  padding: 5px;
`;

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
  aspect-ratio: 0.7;
  object-fit: cover;
  cursor: pointer;

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
`;

const InfoContainer = styled.div`
  padding: 0 15px;
  margin-left: 8%;
  flex-basis: 50%;

  ${tabletPort({ padding: "30px 20px", marginLeft: " 0px" })}
`;

const BrandName = styled.h1`
  font-size: 30px;
  font-weight: 200;

  ${phone({ fontSize: "24px" })}
`;

const Title = styled.h1`
  font-family: "HelveticaNowText-Bold";
  font-size: 34px;

  ${phone({ fontSize: "24px" })}
`;
const Desc = styled.p`
  font-family: "HelveticaNowText-Light";
  margin: 20px 0;
  font-size: 16px;
`;
const Price = styled.span`
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;
  font-size: 25px;
  font-weight: 700;
  margin: 20px 0;
`;

const Originally = styled.h3`
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

const Discount = styled.span`
  color: red;
  text-decoration: none;
  font-size: 15px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px 0;
`;

const ErrorMessage = styled.p`
  background-color: #e9e9e9;
  padding: 15px 0;
  margin-top: 20px;
  font-weight: 200;
  font-family: "HelveticaNowText-Light";
  display: flex;
  align-items: center;
`;

const AddContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;
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
    background-color: #000000;
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

  &.active {
    background-color: red;
  }
`;

const style = {
  fontSize: "1.5rem",
  color: "red",
  marginLeft: "20px",
  marginRight: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const title = { size: "Choose your size" };

const Product = () => {
  const [size, setSize] = useState(null);
  const [err, setErr] = useState(null);
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [isActive, setActive] = useState("img");
  let quantity = 1;
  let isLiked = false;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  const handleChangeSize = (size) => {
    setSize(size);
  };

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  const sizes = data?.attributes?.sizes?.data.map((item) => {
    let label;
    let value;
    label = item.attributes.size_value;
    value = item.attributes.size_value;

    return { label, value };
  });

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
                      data?.attributes?.img?.data?.attributes?.formats
                        ?.thumbnail?.url
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
                      data?.attributes?.img2?.data?.attributes?.formats
                        ?.thumbnail?.url
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
                      data?.attributes?.img3?.data?.attributes?.formats
                        ?.thumbnail?.url
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
                      data?.attributes?.[selectedImg]?.data?.attributes?.formats
                        ?.large.url
                    }
                  />
                </MainImage>
              </ProductGallery>
            </ImageWrapper>
          </ImageContainer>
          <InfoContainer>
            <BrandName>{data?.attributes?.title}</BrandName>
            <Title>{data?.attributes?.description}</Title>
            <Desc>
              Outer fabric material: 100% acetate <br />
              Fabric: Satin <br /> Care instructions: Dry clean only
            </Desc>
            {data?.attributes?.discount ? (
              <Price style={{ color: "red" }}>
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(data?.attributes?.price)}{" "}
                €
              </Price>
            ) : (
              <Price>
                {new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(data?.attributes?.price)}{" "}
                €
              </Price>
            )}
            {data?.attributes?.discount && (
              <Originally>
                <OriginalPrice>
                  Originally:{"  "}
                  {new Intl.NumberFormat("de-DE", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(
                    Math.floor(
                      (data?.attributes.price /
                        (1 - data?.attributes?.discount / 100)) *
                        100
                    ) / 100
                  )}
                  €
                </OriginalPrice>
                <Discount>-{data?.attributes?.discount}%</Discount>
              </Originally>
            )}

            {err && (
              <ErrorMessage>
                <AiFillCloseCircle style={style} />
                {err}
              </ErrorMessage>
            )}

            <FilterContainer>
              <Filter>
                <Dropdown
                  options={sizes}
                  title={title.size}
                  value={size}
                  onChange={handleChangeSize}
                  style={{ width: "100% !important" }}
                />
              </Filter>
            </FilterContainer>
            <AddContainer>
              <BagContainer>
                <Button
                  onClick={() => {
                    if (size === null) {
                      setErr("Please choose your size");
                    } else {
                      dispatch(
                        addToCart({
                          id: data.id,
                          title: data.attributes.title,
                          desc: data.attributes.description,
                          price: data.attributes.price,
                          img: data.attributes.img.data.attributes?.formats
                            ?.thumbnail?.url,
                          quantity,
                          size: size.value,
                        })
                      );
                      setErr(null);
                    }
                  }}
                >
                  add to bag
                </Button>

                <ButtonHeart
                // onClick={() =>
                //   dispatch(liked({ id: data.id, isLiked: false }))
                // }
                // className={`${isLiked ? "active" : ""}`}
                >
                  <BsHeart style={{ fontSize: "25px" }} />
                </ButtonHeart>
              </BagContainer>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      )}
    </Container>
  );
};

export default Product;
