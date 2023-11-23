import styled from "styled-components";
import CountdownTimer from "./CountdownTimer";
import { NavLink } from "react-router-dom";
import { laptop, phone, tabletLand, tabletPort } from "../responsive";

const Container = styled.div`
  height: 32px;
  background-color: #8a10a5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  z-index: 100;

  ${phone({
    flexDirection: "column",
    height: "70px",
    padding: "10px 20px",
    textAlign: "center",
    justifyContent: "space-between",
  })}

  ${tabletLand({
    flexDirection: "column",
    height: "40px",
    padding: "10px 20px",
    textAlign: "center",
    justifyContent: "space-between",
  })}

  ${tabletPort({
    flexDirection: "column",
    height: "50px",
    textAlign: "center",
    justifyContent: "space-between",
  })}
`;

const BoldText = styled.b`
  font-size: 14px;
  font-weight: bold;

  ${phone({ fontSize: "12px" })}
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
  ${phone({ fontSize: "12px" })}
`;

const Announcement = () => {
  return (
    <Container>
      <NavLink to="/products/4">
        <Title>
          <BoldText>Black Friday Sneak Peek</BoldText>: up to{" "}
          <BoldText>-50% OFF</BoldText>! Beat the rush & get your order before
          the holidays, no code necessary.
        </Title>
      </NavLink>
      <CountdownTimer />
    </Container>
  );
};

export default Announcement;
