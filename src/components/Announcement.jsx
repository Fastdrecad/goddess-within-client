import styled from "styled-components";
import CountdownTimer from "./CountdownTimer";
import { NavLink } from "react-router-dom";

const Container = styled.div`
  height: 32px;
  background-color: #db1313;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

const Announcement = () => {
  return (
    <Container>
      <NavLink to={"/products/woman"}>
        <Title>
          <b style={{ fontSize: "14px" }}>Black Friday Sneak Peek</b>: up to{" "}
          <b style={{ fontSize: "14px" }}>-50% OFF</b>! Beat the rush & get your
          order before the holidays, no code necessary.
        </Title>
      </NavLink>
      <br />
      <CountdownTimer margin="10px" />
    </Container>
  );
};

export default Announcement;
