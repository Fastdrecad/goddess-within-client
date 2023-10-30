import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Categories = () => {
  const [showLoader, setShowLoader] = useState(false);

  const onSubmit = () => {
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 1000);
  };
  return (
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
