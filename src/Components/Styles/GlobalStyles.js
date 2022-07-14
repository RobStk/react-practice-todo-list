import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        color: ${({ theme }) => theme.colors.foreground.primary};
        background-color: ${props => props.backgroundColor};
    }
`
export default GlobalStyle;