import styled from "styled-components";

const ColumnSectionStyle = styled.div`
    display: ${(props) => props.display || "flex"};
    flex-direction: column;
    align-items: ${(props) => props.alignItems || "center"};
    width: ${(props) => props.width || "100%"};
    gap: ${(props) => props.gap || "0.4em"};
    font-size: ${(props) => props.fontSize || "inherit"};
`
ColumnSectionStyle.displayName = "ColumnSectionStyle";

export default ColumnSectionStyle;