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
        padding: .5em;
        border: none;
        border-radius: 0.4em;
    }

    &[type="text"]:hover{
        background-color: ${({ theme }) => theme.colors.background.stage2};
    }
    &[type="text"]:focus{
        background-color: ${({ theme }) => theme.colors.background.stage2};
        outline: none;
    }
`

export default InputStyle;