import { ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  display: flex;
  position: fixed;
  bottom: 50px;
  right: 50px;
  color: white;
  align-items: center;
  justify-content: center;
  padding: 10px 5px 10px 15px;
  text-transform: uppercase;
  font-size: 12px;
  background-color: #000000;
  border: none;
  cursor: pointer;
  z-index: 999;
  visibility: hidden;
  opacity: 0;
  transition: all 550ms ease-in-out;

  &.show {
    opacity: 1;
    visibility: visible;
  }
`;

const GoToTop = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <Button onClick={goToTop} className={showTopBtn ? "show" : ""}>
        Go To Top
        <ArrowUpward
          style={{
            fontSize: "20px",
            paddingLeft: "10px",
            paddingRight: "7px",
          }}
        />
      </Button>
    </>
  );
};

export default GoToTop;
