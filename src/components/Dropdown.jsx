import React, { useState } from "react";
import styled from "styled-components";

const DropDownContainer = styled.div`
  width: 15em;
  margin-bottom: 20px;
`;

const DropDownHeader = styled.div`
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
  width: 15em;
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

const Dropdown = ({ options, title, value }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    console.log(selectedOption);
  };

  return (
    <DropDownContainer>
      <DropDownHeader
        onClick={toggling}
        className={`${isOpen ? "active" : ""}`}
      >
        {selectedOption || title}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default Dropdown;
