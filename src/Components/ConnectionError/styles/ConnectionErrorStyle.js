import styled from "styled-components";

const ConnectionErrorStyle = styled.div`
    margin: ${({ theme }) => theme.margin.large};
    text-align: center;
    & .errorIcon {
        font-size: xx-large;
    }
    & .errorDescription {
        margin-bottom: ${({ theme }) => theme.margin.large};
    }
    & .errorAdvice {
        font-size: small;
    }
`
ConnectionErrorStyle.displayName = "ConnectionErrorStyle";

export default ConnectionErrorStyle;