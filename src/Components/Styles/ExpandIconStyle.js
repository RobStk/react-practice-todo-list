import styled from "styled-components";

const ExpandIconStyle = styled.div`
    transition: all .1s;
    &.collapsed{
        transform: rotate(-90deg);
    }
    &.expanded{
        transform: rotate(0deg);
    }
`
ExpandIconStyle.displayName = "ExpandIconStyle";

export default ExpandIconStyle;