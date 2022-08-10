import styled from "styled-components";

const ButtonStyle = styled.button`
    font-size: ${(props) => props.fontSize || "large"};
    font-family: ${(props) => props.fontFamily || "inherit"};
    background: ${(props) => props.backgroundColor || "none"};
    padding: ${({ theme }) => theme.padding.medium};
    border: none;
    border-radius: 4px;
    width: ${(props) => props.width || ""};
    display: ${(props) => props.display || "none"};
    opacity: ${(props) => props.opacity || "inherit"};
    align-items: center;
    column-gap: 0.4em;
    color: ${({ color }) => color || "white"};
    color: ${(props) => {
    if (props.className === "acceptButton") return props.theme.colors.foreground.green;
    if (props.className === "cancelButton") return props.theme.colors.foreground.red;
    if (props.color) return props.color;
    }};

    &:hover{
        background-color: ${(props) => props.hoverBackgroundColor ? props.hoverBackgroundColor : props.theme.colors.background.stage3};
        cursor: default;
    }
`
ButtonStyle.displayName = "ButtonStyle";

export default ButtonStyle;