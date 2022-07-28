import styled from "styled-components";

const ButtonStyle = styled.button`
    font-size: ${(props) => props.fontSize || "large"};
    font-family: ${(props) => props.fontFamily || "inherit"};
    background: ${(props) => props.backgroundColor || "none"};
    line-height: 0;
    padding: 6px;
    border: none;
    border-radius: 4px;
    width: ${(props) => props.width || ""};
    display: ${(props) => props.display || "none"};
    align-items: center;
    column-gap: 0.4em;
    color: ${({ color }) => color || "white"};
    color: ${(props) => {
        if (props.className === "accept") return props.theme.colors.foreground.green;
        if (props.className === "cancel") return props.theme.colors.foreground.red;
        if (props.color) return props.color;
    }};

    &:hover{
        background-color: ${(props) => props.hoverBackgroundColor ? props.hoverBackgroundColor : props.theme.colors.background.stage3};
        cursor: default;
    }
`
ButtonStyle.displayName = "ButtonStyle";

export default ButtonStyle;