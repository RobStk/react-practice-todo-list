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

    svg {
        pointer-events: none;
    }

    ::-webkit-scrollbar {
        background: none;
        width: 8px;
        height: 8px;
    }

    ::-webkit-scrollbar-thumb{
        background-color: ${({ theme }) => theme.colors.foreground.secondary};
        border-radius: 3px;
    }

`
export default GlobalStyle;