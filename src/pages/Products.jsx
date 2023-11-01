import styled from "styled-components";
import List from "../components/List";
import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import Dropdown from "../components/Dropdown";

const Container = styled.div`
  padding: 30px 50px;
  display: flex;
`;

const ContainerLeft = styled.div`
  flex: 1;
  position: sticky;
  height: 100%;
  top: 50px;
  margin-left: 150px;
`;

const ContainerRight = styled.div`
  flex: 3;
`;

const InputItem = styled.div``;
const Input = styled.input``;
const Label = styled.label`
  margin-left: 10px;
`;

const Title = styled.h1`
  margin: 30px 0;
  text-transform: capitalize;
  font-size: 34px;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 15em;
  padding: 10px;
  margin-bottom: 20px;
  text-transform: uppercase;
  border: 2px solid black;
`;
const Option = styled.option``;

const options = {
  size: ["XS", "S", "M", "L", "XL"],
  price: ["PRICE (ASC)", "PRICE (DESC)"],
};

const title = { size: "Choose your size", price: "Sort by price" };

const value = ["asc", "desc"];

const Products = () => {
  const catId = parseInt(useParams().id);

  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("asc");

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const [sortBySize, setSortBySize] = useState({});

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleSize = (e) => {
    const value = e.target.value;

    setSortBySize({ ...sortBySize, [e.target.value]: value });
  };

  console.log(sortBySize);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

  // console.log(selectedSubCats);

  return (
    <>
      <Container>
        <ContainerLeft>
          <Title>Product Category</Title>
          {data?.map((item) => (
            <InputItem key={item.id}>
              <Input
                type="checkbox"
                id={item.id}
                value={item.id}
                onChange={handleChange}
              />
              <Label htmlFor={item.id}>{item.attributes.title}</Label>
            </InputItem>
          ))}
          <FilterContainer>
            <Filter>
              <FilterText>Filter Products:</FilterText>
              <Select name="price">
                <Option value="" disabled>
                  price
                </Option>
                <Option>range</Option>
              </Select>
              {/* <Dropdown
                options={options.price}
                title={title.price}
                value={value}
              />
              <Dropdown options={options.size} title={title.size} /> */}

              <Select name="size" onChange={handleSize}>
                <Option disabled value="">
                  Choose your size
                </Option>
                <Option>XS</Option>
                <Option>S</Option>
                <Option>M</Option>
                <Option>L</Option>
                <Option>XL</Option>
              </Select>

              {/* ------------ OLDER VERSION ----------- */}

              <Select onChange={(e) => setSort(e.target.value)}>
                <Option value="" disabled>
                  SORT BY PRICE
                </Option>
                <Option value="asc">price (asc)</Option>
                <Option value="desc">price (desc)</Option>
              </Select>

              {/* filter by price */}
              <Filter>
                <InputItem>
                  <span>0</span>
                  <Input
                    type="range"
                    min={0}
                    max={1000}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                  <span>{maxPrice}</span>
                </InputItem>
              </Filter>
            </Filter>
          </FilterContainer>
        </ContainerLeft>
        <ContainerRight>
          {/* ------------ LIST COMPONENT FOR CATEGORY PAGE ------------ */}
          <List
            catId={catId}
            maxPrice={maxPrice}
            sort={sort}
            subCats={selectedSubCats}
            sortBySize={sortBySize}
          />
        </ContainerRight>
      </Container>
      <FeaturedProducts type="featured" />
    </>
  );
};

export default Products;
