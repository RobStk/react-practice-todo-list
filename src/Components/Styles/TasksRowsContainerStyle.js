import styled from "styled-components";

const TasksRowsContainerStyle = styled.div`
    display: ${(props) => props.display || "grid"};
    gap: 3px;
    margin-top: 10px;
    margin-bottom: 10px;
`
TasksRowsContainerStyle.displayName = "TasksRowsContainerStyle";

export default TasksRowsContainerStyle;