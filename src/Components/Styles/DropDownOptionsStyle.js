import styled from "styled-components";

const DropDownOptionsStyle = styled.div`
    display: ${(props) => props.display || "flex"};
    flex-direction: column;
    justify-items: left;
    font-size: ${(props) => props.fontSize || "inherit"};

    & > div {
        position: absolute;
        margin-top: 6px;
        background-color: ${({ theme }) => theme.colors.background.stage2};
        padding: 0;
    }

    & > div > * {
        font-size: ${(props) => props.fontSize || "inherit"};
        border-radius: 0%;
        width: 100%;
        padding-left: ${({ theme }) => theme.padding.large};
    }
`
DropDownOptionsStyle.displayName = "DropDownOptionsStyle";

export default DropDownOptionsStyle;