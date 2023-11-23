import { ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { phone } from "../responsive";

const Button = styled.button`
  position: fixed;
  bottom: 50px;
  right: 50px;
  align-items: center;
  justify-content: center;
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

  ${phone({ bottom: "22px", right: "22px" })}
`;

const ButtonContent = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 5px 15px;

  ${phone({ padding: "5px 10px " })}
`;

const TextSpan = styled.span`
  color: white;
  text-transform: uppercase;
  font-size: 12px;

  ${phone({ display: "none" })}
`;

const IconSpan = styled.span`
  color: white;
  text-align: center;

  :first-child {
    font-size: 22px;
  }

  ${phone({})}
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
        <ButtonContent>
          <TextSpan>Go To Top</TextSpan>
          <IconSpan>
            <ArrowUpward />
          </IconSpan>
        </ButtonContent>
      </Button>
    </>
  );
};

export default GoToTop;
