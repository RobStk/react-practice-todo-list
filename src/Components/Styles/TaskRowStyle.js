import styled from "styled-components";

const TaskRowStyle = styled.div`
    color: ${(props) => props.theme.colors.foreground.primary};
    background-color: ${(props) => props.isActive ? props.theme.colors.background.stage2 : props.theme.colors.background.stage1};
    border: none;
    border-radius: 5px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    justify-items: left;
    align-items: center;
    gap: 10px;
    padding: 0.4em;
    ${(props) => { if (props.done) return "opacity: 0.3; text-decoration: line-through;" }};

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