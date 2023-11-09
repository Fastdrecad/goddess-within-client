import styled from "styled-components";
import FeaturedProducts from "../components/FeaturedProducts";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BsHeart } from "react-icons/bs";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import Dropdown from "../components/Dropdown";

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
  color: ${(props) => props.$clr};
  display: flex;
  gap: 20px;
  font-size: 25px;
  font-weight: 700;
  margin: 20px 0;
`;

const Originally = styled.h3`
  color: ${(props) => props.$clr};
  /* font-weight: 400; */
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
  /* margin: 20px 0; */
`;

const Filter = styled.div`
  display: flex;
  width: 100%;
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

  &.active {
    background-color: red;
  }
`;

const title = { size: "Choose your size" };

const Product = () => {
  const [size, setSize] = useState(null);
  const id = useParams().id;
  // console.log(id);
  const [selectedImg, setSelectedImg] = useState("img");
  // console.log(selectedImg);
  const [isActive, setActive] = useState("img");
  let quantity = 1;
  let isLiked = false;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.products);

  const handleChangeSize = (size) => {
    setSize(size);
  };

  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  console.log(data);

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
            <Title>{data?.attributes?.desc}</Title>
            <Desc>
              Outer fabric material: 100% acetate <br />
              Fabric: Satin <br /> Care instructions: Dry clean only
            </Desc>
            {/* <Price>{data?.attributes?.price} €</Price> */}
            {data?.attributes?.discount ? (
              <Price style={{ color: "red" }}>
                {data?.attributes?.price} €
              </Price>
            ) : (
              <Price>{data?.attributes?.price} €</Price>
            )}
            {data?.attributes?.discount && (
              <Originally>
                <OriginalPrice>
                  Originally:{"  "}
                  {Math.floor(
                    (data?.attributes.price /
                      (1 - data?.attributes?.discount / 100)) *
                      100
                  ) / 100}
                  €
                </OriginalPrice>
                <Discount>-{data?.attributes?.discount}%</Discount>
              </Originally>
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
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: data.id,
                        title: data.attributes.title,
                        desc: data.attributes.desc,
                        price: data.attributes.price,
                        img: data.attributes.img.data.attributes.url,
                        quantity,
                        size: size.value,
                      })
                    )
                  }
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
