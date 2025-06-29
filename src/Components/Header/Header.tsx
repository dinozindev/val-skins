import { Link } from "react-router-dom"
import styled from "styled-components"

const StyledHeader = styled.header`
    width: 100%;
    background-color: #FF4654;
`

const Header = () => {
  return (
    <>
    <StyledHeader>
        <Link to="/skins">Skins</Link>
    </StyledHeader>
    </>
  )
}

export default Header