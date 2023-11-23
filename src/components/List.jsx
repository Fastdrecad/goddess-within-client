import styled from "styled-components";
import Card from "./Card";
import useFetch from "../hooks/useFetch";
import { phone, tabletPort } from "../responsive";

const Container = styled.div`
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  ${tabletPort({ marginTop: " 0px" })};
  ${phone({ marginTop: "20px" })};
`;

const List = ({ catId, maxPrice, sort, subCats, size }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}${
      size ? "&[filters][sizes][size_value][$eq]=" + size : ""
    }&[filters][price][$lte]=${maxPrice}${sort ? "&sort=price:" + sort : ""}`
  );

  return (
    <Container>
      {loading
        ? "loading"
        : data?.map((item) => (
            <Card item={item} key={Math.random()} id={item.id} />
          ))}
    </Container>
  );
};

export default List;
