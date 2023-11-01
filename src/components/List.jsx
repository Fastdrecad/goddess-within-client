import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

const Container = styled.div`
  gap: 15px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 100px;
`;

const List = ({ catId, maxPrice, sort, subCats, sortBySize }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
      (item) => `&[filters][sub_categories][id][$eq]=${item}`
    )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
  );
  // console.log(data);

  const res = data.map((q, i) => ({ isLiked: false, ...data[i] }));
  // console.log(res);

  return (
    <Container>
      {loading
        ? "loading"
        : res?.map((item) => (
            <Card
              item={item}
              key={Math.random()}
              isLiked={item.isLiked}
              id={item.id}
            />
          ))}
    </Container>
  );
};

export default List;
