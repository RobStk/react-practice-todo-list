import styled from "styled-components";

const TasksRowsContainerStyle = styled.ul`
    padding-inline-start: 0;
    display: ${(props) => props.display || "grid"};
    gap: 3px;
`
TasksRowsContainerStyle.displayName = "TasksRowsContainerStyle";

export default TasksRowsContainerStyle;