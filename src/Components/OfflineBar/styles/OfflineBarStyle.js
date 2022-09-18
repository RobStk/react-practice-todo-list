import styled from "styled-components";

const OfflineBarStyle = styled.div`
    display: ${(props) => props.display || 'flex'};
    padding: ${({ theme }) => theme.padding.small};
    justify-content: space-between;
    align-items: center;
    font-size: small;
    background-color: ${({ theme }) => theme.colors.background.stage1};
    position: absolute;
    width: 100%;

    & .icon {
        font-size: xx-large;
        margin: 0px 10px;
        color: ${({ theme }) => theme.colors.foreground.red};
        line-height: 1;
    }

    & span {
        width: 100%;
    }

    & button {
        background-color: ${({ theme }) => theme.colors.background.stage2};
        margin: 2px 10px;
        font-size: inherit;
        min-width: max-content;
    }

    & button:hover {
        background-color: ${({ theme }) => theme.colors.background.stage3};
    }
`
OfflineBarStyle.displayName = OfflineBarStyle;

export default OfflineBarStyle;