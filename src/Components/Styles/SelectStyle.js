import styled from "styled-components";

const SelectStyle = styled.select` //TODO Do usunięcia?
    outline: none;
    background-color: ${({ theme }) => theme.colors.background.stage1};
    color: ${({ theme }) => theme.colors.foreground.primary};
    line-height: 1;
    border: none;
    border-radius: 4px;
    padding: 6px;

    &:hover{
        background-color: ${(props) => props.hoverBackgroundColor ? props.hoverBackgroundColor : props.theme.colors.background.stage2};
        cursor: default;
    }

    & option:focus {
        color: red !important;
    }
    & option:checked {
        color: red !important;
    }
    & option:hover {
        color: red !important;
    }
`
SelectStyle.displayName = "SelectStyle";

export default SelectStyle;