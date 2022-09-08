import styled from "styled-components";

const TasksRowsContainerStyle = styled.div`
    display: ${(props) => props.display || "grid"};
    gap: 3px;
    margin-top: 6px;
    margin-bottom: 6px;
`
TasksRowsContainerStyle.displayName = "TasksRowsContainerStyle";

export default TasksRowsContainerStyle;