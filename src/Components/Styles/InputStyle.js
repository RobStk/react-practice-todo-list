import styled from "styled-components";

const InputStyle = styled.input`
    background-color: inherit;
    color: white;
    width: 100%;
    font-size: 100%;
    
    &::placeholder {
        color: ${({ theme }) => theme.colors.foreground.secondary};
    }

    &[type="text"] {
        border: none;
        padding: 0;
    }

    &[type="text"]:hover{
        background-color: ${({ theme }) => theme.colors.background.stage2};
    }
    
    &[type="text"]:focus{
        outline: none;
        font-family: inherit;
    }
`
InputStyle.displayName = "InputStyle";

export default InputStyle;