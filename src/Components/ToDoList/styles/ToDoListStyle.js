import styled from "styled-components";

const ToDoListStyle = styled.div`
    max-width: 1000px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    -webkit-box-shadow: 0px 0px 30px -10px ${({ theme }) => theme.colors.background.stage1};
    -moz-box-shadow: 0px 0px 30px -10px ${({ theme }) => theme.colors.background.stage1};
    box-shadow: 0px 0px 30px -10px ${({ theme }) => theme.colors.background.stage1};
`
ToDoListStyle.displayName = "ToDoListStyle";

export default ToDoListStyle;