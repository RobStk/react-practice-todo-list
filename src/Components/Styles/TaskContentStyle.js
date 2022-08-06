import styled from "styled-components";

const TaskContentStyle = styled.div`
    width: 100%;
    overflow: hidden;
    white-space: ${(props) => props.isExpanded ? "" : "nowrap"};
    text-overflow: ellipsis;
    align-self: center;
    transition: height 0.2s;
    padding-top: ${({ theme }) => theme.padding.medium};
    padding-bottom: ${({ theme }) => theme.padding.medium};
`
TaskContentStyle.displayName = "TaskContentStyle";

export default TaskContentStyle;