import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
   

    &.overflow-hidden{
     overflow: hidden;
    }
   
   }


 
`;

export default GlobalStyle;
