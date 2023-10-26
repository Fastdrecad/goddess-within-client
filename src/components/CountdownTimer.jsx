import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-left: 10px;
`;
const Time = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
`;

const CountdownTimer = () => {
  const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

  let num;

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date("November 24, 2023 00:00:00").getTime();

    interval = setInterval(() => {
      const now = new Date();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        // stop timer
        clearInterval(interval.current);
      } else {
        // update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  });

  return (
    <Container>
      <Time style={{ fontWeight: "900", width: "28px", textAlign: "center" }}>
        {timerDays}
      </Time>
      {num <= 1 ? <Time> day,</Time> : <Time> days,</Time>}
      <Time style={{ fontWeight: "900", width: "28px", textAlign: "center" }}>
        {timerHours}
      </Time>
      {num <= 1 ? <Time> hr, </Time> : <Time> hrs,</Time>}
      <Time style={{ fontWeight: "900", width: "28px", textAlign: "center" }}>
        {timerMinutes}
      </Time>
      <Time> min, </Time>
      <Time style={{ fontWeight: "900", width: "28px", textAlign: "center" }}>
        {timerSeconds}
      </Time>

      <Time> sec</Time>
    </Container>
  );
};

export default CountdownTimer;
