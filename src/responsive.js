import { css } from "styled-components";

export const phone = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

export const tabletPort = (props) => {
  return css`
    @media only screen and (max-width: 640px) {
      ${props}
    }
  `;
};

export const tabletLand = (props) => {
  return css`
    @media only screen and (max-width: 980px) {
      ${props}
    }
  `;
};
