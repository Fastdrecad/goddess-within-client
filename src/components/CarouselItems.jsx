import styled from "styled-components";
import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import { sliderItems } from "../data";

const Container = styled.section`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const CarouselContainer = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  list-style: none;
`;

const ListItem = styled.li`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
`;

const Dots = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 50px;
  display: flex;
  text-align: center;
  justify-content: center;
`;

const DotItem = styled.div`
  margin: 0 8px;
  cursor: pointer;
  color: #000000;
  font-size: 15px;

  &.active {
    color: red;
  }
`;

const Button = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border: 1px solid black;
  cursor: pointer;
  z-index: 1;
  border: none;

  &.btnLeft {
    left: 50px;
  }
  &.btnRight {
    right: 50px;
  }
`;

const CarouselItems = ({ children }) => {
  const containerRef = useRef();
  const [current, setCurrent] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const intervalRef = useRef(null);

  const goToSlide = (slideIndex) => {
    containerRef.current.style.transitionDuration = "1200ms";
    setTranslateX(containerRef.current.clientWidth * slideIndex);
    setCurrent(slideIndex);
  };

  const actionHandler = useCallback(
    (mode) => {
      containerRef.current.style.transitionDuration = "1200ms";
      if (mode === "prev") {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent((prev) => --prev);
        }
      } else if (mode === "next") {
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => ++prev);
        }
      }
    },
    [children, current]
  );

  // This is for infinite scroll smooth effect
  useEffect(() => {
    const transitionEnd = () => {
      if (current <= 1) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * current);
      }

      if (current >= children.length) {
        containerRef.current.style.transitionDuration = "0ms";
        setTranslateX(containerRef.current.clientWidth * children.length);
      }
    };

    document.addEventListener("transitionend", transitionEnd);

    return () => {
      document.removeEventListener("transitionend", transitionEnd);
    };
  }, [current, children]);

  // for autoplay
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      actionHandler("next");
    }, 13000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  const slides = useMemo(() => {
    if (children.length > 1) {
      let items = Children.map(children, (child, i) => (
        <ListItem key={i}>{child}</ListItem>
      ));

      return [
        <ListItem key={children.length + 1}>
          {children[children.length - 1]}
        </ListItem>,
        ...items,
        <ListItem key={children.length + 2}>{children[0]}</ListItem>,
      ];
    }

    return <ListItem>{children[0]}</ListItem>;
  }, [children]);

  // The Keypress Event Handler
  const changeChild = useCallback(
    (e) => {
      if (e.key === "ArrowLeft") {
        // If supposed previous child is < 0 set it to last child
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children.length);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current - 1));
          setCurrent((prev) => --prev);
        }
      } else if (e.key === "ArrowRight") {
        // If supposed next child is > length - 1 set it to first child
        if (current >= children.length) {
          setTranslateX(
            containerRef.current.clientWidth * (children.length + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(containerRef.current.clientWidth * (current + 1));
          setCurrent((prev) => ++prev);
        }
      }
    },
    [children, current]
  );

  // Set and cleanup the event listener
  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  });

  // position first element correctly & this will render only once
  useLayoutEffect(() => {
    setTranslateX(containerRef.current.clientWidth * current);
  }, []);

  return (
    <Container>
      {/* ------------------------------------------- */}
      <Button className="btnLeft" onClick={() => actionHandler("prev")}>
        <ArrowBack />
      </Button>
      <Button className="btnRight" onClick={() => actionHandler("next")}>
        <ArrowForward />
      </Button>
      {/* ------------------------------------------- */}
      <CarouselContainer
        ref={containerRef}
        style={{
          transform: `translate3d(${-translateX}px, 0, 0)`,
        }}
      >
        {slides}
      </CarouselContainer>
      {/* ------------------------------------------- */}
      <Dots className="dotsContainer">
        {sliderItems.map((_, slideIndex) => (
          <DotItem
            key={slideIndex}
            className={`dot ${current === slideIndex + 1 ? "active" : ""}`}
            onClick={() => goToSlide(slideIndex + 1)}
          >
            &#11044;
          </DotItem>
        ))}
      </Dots>
    </Container>
  );
};

export default CarouselItems;
