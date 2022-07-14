import styled from "styled-components";

const TaskAdderStyle = styled.form`
    display: grid;
    align-items: center;
    width: 100%;
    grid-template-columns: 1fr auto;
    padding-left: 0.2em;
    padding-right: 0.2em;
    border-radius: 5px;
    color: ${props => props.theme.colors.foreground.secondary};

    background-color: ${(props) =>
        props.isFocus && props.theme.colors.background.stage2
    };

    &:hover{
        background-color: ${({ theme }) => theme.colors.background.stage2};
    };

    &:focus{
        background-color: ${({ theme }) => theme.colors.background.stage2};
    }
`

export default TaskAdderStyle;