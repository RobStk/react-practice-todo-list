import styled from "styled-components";

const ButtonStyle = styled.button`
    font-size: large;
    display: ${(props) => props.display || "none"};
    background: ${(props) => props.backgroundColor || "none"};
    line-height: 0;
    padding: 6px;
    border: none;
    border-radius: 4px;
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