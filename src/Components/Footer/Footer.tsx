import styled from "styled-components"

const StyledFooter = styled.footer`
    display:flex;
    justify-content: flex-end;
    padding: 2rem;
    h2 {
      font-weight: 400;
      font-size: 18px;
    }
`

const Footer = () => {
  return (
    <StyledFooter>
        <h2>Developed by dinozindev</h2>
    </StyledFooter>
  )
}

export default Footer