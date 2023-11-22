import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { phone } from "../responsive";

const Container = styled.div`
  margin-left: 10px;
`;
const Time = styled.span`
  font-weight: 900;
  width: 28px;
  text-align: center;
  margin: 5px;
  font-size: 14px;

  ${phone({ fontSize: "14px" })}
`;

const TimeText = styled.span`
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
      <Time>{timerDays}</Time>
      {num <= 1 ? <TimeText> day,</TimeText> : <TimeText> days,</TimeText>}
      <Time>{timerHours}</Time>
      {num <= 1 ? <TimeText> hr, </TimeText> : <TimeText> hrs,</TimeText>}
      <Time>{timerMinutes}</Time>
      <TimeText> min, </TimeText>
      <Time>{timerSeconds}</Time>

      <TimeText> sec</TimeText>
    </Container>
  );
};

export default CountdownTimer;
