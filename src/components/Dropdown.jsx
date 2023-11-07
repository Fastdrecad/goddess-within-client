import React, { useEffect, useRef, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import styled from "styled-components";

const DropDownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: 100%;
`;

const DropDownHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  padding: 10px;
  font-weight: 500;
  font-size: 16px;
  border: 2px solid black;
  text-align: left;
  color: #000000;

  &:hover {
    background-color: #eaeaea;
  }
  &.active {
    background-color: transparent;
  }
`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 100%;
`;

const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
  margin: 0;
  background: #ffffff;
  border: 2px solid #000000;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
`;

const ListItem = styled.li`
  user-select: none;
  margin: 0;
  padding: 15px 0;
  width: 90%;
  text-align: center;
  list-style: none;

  &:not(:last-child) {
    border-bottom: 1px solid #b1b1b1;
  }

  &:hover {
    background-color: #eaeaea;
    width: 100%;
  }
`;

const Dropdown = ({ value, options, onChange, title }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropDownRef = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleDropdownClick = (e) => {
      if (!dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleDropdownClick, true);

    return () => {
      document.removeEventListener("click", handleDropdownClick, true);
    };
  }, []);

  const handleChange = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  const renderedOptions = options?.map((option) => {
    return (
      <ListItem onClick={() => handleChange(option)} key={option.value}>
        {option.label}
      </ListItem>
    );
  });

  return (
    <DropDownContainer ref={dropDownRef}>
      <DropDownHeader
        onClick={handleClick}
        className={`${isOpen ? "active" : ""}`}
      >
        {value?.label || title}
        {isOpen ? (
          <MdOutlineKeyboardArrowUp style={{ fontSize: "25px" }} />
        ) : (
          <MdOutlineKeyboardArrowDown style={{ fontSize: "25px" }} />
        )}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>{renderedOptions}</DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
