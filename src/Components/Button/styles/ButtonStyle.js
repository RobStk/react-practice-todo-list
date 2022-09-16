import styled from "styled-components";

const ButtonStyle = styled.button`
    font-size: ${(props) => props.fontSize || "large"};
    font-family: ${(props) => props.fontFamily || "inherit"};
    line-height: ${(props) => props.lineHeight || 1};
    background: ${(props) => props.background || "none"};
    background-color: ${(props) => {
        switch (props.backgroundColor) {
            case "background-stage1": return props.theme.colors.background.stage1;
            case "background-stage2": return props.theme.colors.background.stage2;
            case "background-stage3": return props.theme.colors.background.stage3;
            default: return props.backgroundColor;
        }
    }};
    padding: ${({ theme }) => theme.padding.medium};
    border: ${(props) => props.border || "none"};
    border-color: ${(props) => {
        switch (props.borderColor) {
            case "background-stage1": return props.theme.colors.background.stage1;
            case "background-stage2": return props.theme.colors.background.stage2;
            case "background-stage3": return props.theme.colors.background.stage3;
            default: return props.backgroundColor;
        }
    }};
    border-radius: 4px;
    width: ${(props) => props.width || ""};
    display: ${(props) => props.display || "none"};
    opacity: ${(props) => props.opacity || "inherit"};
    align-items: center;
    column-gap: 0.4em;
    color: ${(props) => props.color || props.theme.colors.foreground.primary};
    color: ${(props) => {
    if (props.className === "acceptButton") return props.theme.colors.foreground.green;
    if (props.className === "cancelButton") return props.theme.colors.foreground.red;
    if (props.color) return props.color;
    }};

    &:hover{
        background-color: ${(props) => props.hoverBackgroundColor ? props.hoverBackgroundColor : props.theme.colors.background.stage3};
        cursor: default;
    };

    & .buttonTextValue{
        display: ${(props) => props.textValueDisplay};
        color: inherit;
        font: inherit;
    };
`
ButtonStyle.displayName = "ButtonStyle";

export default ButtonStyle;