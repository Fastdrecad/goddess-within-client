import styled from "styled-components";
import List from "../components/List";
import { useState } from "react";
import { useParams } from "react-router-dom";
import FeaturedProducts from "../components/FeaturedProducts";
import useFetch from "../hooks/useFetch";
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
  width: 17em;
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
const Form = styled.form`
  display: flex;
`;
const Option = styled.option``;

const sizes = [
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
];

const price = [
  { label: "PRICE (ASC)", value: "asc" },
  { label: "PRICE (DESC)", value: "desc" },
];

const title = { size: "Filter by size", price: "Sort by price" };

const Products = () => {
  const catId = parseInt(useParams().id);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [value, setValue] = useState(null);
  const [size, setSize] = useState(null);

  const [selectedSubCats, setSelectedSubCats] = useState([]);

  const { data, loading, error } = useFetch(
    `/sub-categories?[filters][categories][id][$eq]=${catId}`
  );

  const handleChangePrice = (option) => {
    setValue(option);
  };

  const handleChangeSize = (size) => {
    setSize(size);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedSubCats(
      isChecked
        ? [...selectedSubCats, value]
        : selectedSubCats.filter((item) => item !== value)
    );
  };

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
              <Dropdown
                options={price}
                value={value}
                onChange={handleChangePrice}
                title={title.price}
              />
              <Dropdown
                options={sizes}
                value={size}
                onChange={handleChangeSize}
                title={title.size}
              />

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
            subCats={selectedSubCats}
            sort={`${!value?.value ? "" : value.value}`}
            size={`${!size?.value ? "" : size.value}`}
          />
        </ContainerRight>
      </Container>
      <FeaturedProducts type="featured" />
    </>
  );
};

export default Products;
