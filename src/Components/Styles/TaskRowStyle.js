import styled from "styled-components";

const TaskRowStyle = styled.div`
    color: ${(props) => props.theme.colors.foreground.primary};
    background-color: ${(props) => props.isActive ? props.theme.colors.background.stage2 : props.theme.colors.background.stage1};
    border: none;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    /* grid-template-rows: ${(props) => props.isActive ? "auto" : "1.9em"}; */
    justify-items: left;
    align-items: flex-start;
    /* align-items: ${(props) => props.isActive ? "flex-start" : "center"}; */
    gap: 10px;
    padding: 0.4em;

    ${(props) => { if (props.done) return "opacity: 0.3; text-decoration: line-through;" }}

    &:hover {
        background-color: ${({ theme }) => theme.colors.background.stage2};
        cursor: default;
    }

    &:focus{
        background-color: ${({ theme }) => theme.colors.background.stage2};
        outline: none;
    }
`
TaskRowStyle.displayName = "TaskRowStyle";

export default TaskRowStyle;