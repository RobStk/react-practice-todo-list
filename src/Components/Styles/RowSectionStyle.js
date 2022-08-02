import styled from "styled-components";

const RowSectionStyle = styled.div`
    display: ${(props) => props.display || "flex"};
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: ${(props) => props.gap || "0.4em"};

    &>div{
        min-width: max-content;
    }
`
RowSectionStyle.displayName = "RowSectionStyle";

export default RowSectionStyle;