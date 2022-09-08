import styled from "styled-components";

const TextAreaStyle = styled.textarea`
    width: ${(props) => props.width || '100%'};
    height: ${(props) => props.height || '100%'};
    background: none;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    outline: none;
    border: none;
    resize: none;
    padding: 0;
    padding-top: ${({ theme }) => theme.padding.medium};
    padding-bottom: ${({ theme }) => theme.padding.medium};
    scroll-behavior: smooth;
`
TextAreaStyle.displayName = "TextAreaStyle";

export default TextAreaStyle;