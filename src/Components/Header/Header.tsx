import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "/img/vlrlogo.png"

const StyledHeader = styled.header`
    width: 100%;
    background-color: #0F1923;
    height: 6rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-wrap: wrap; 
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;  
    position: sticky;  
    top: 0;
    z-index: 10;
    a {
      text-decoration: none;
      font-size: 20px;
    }
    a:visited {
      color: #fff;
    } 
    a:hover {
      color: lightgrey;
      transition: 0.2s;
    }
`

const Logo = styled.div`
  display:flex;
  align-items: center;
  gap: 1rem;
  img {
    width: 6%;
  }
  span {
    color: #FF5062;
  }
`

const StyledNavbar = styled.nav`
    display: flex;
    gap: 2rem;
`

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Link to="/">
        <Logo>
          <img src={logo} alt="valorant logo"/>
          <h1>Val<span>Skins</span></h1>
        </Logo>
        </Link>
        <StyledNavbar>
          <Link to="/skins">Skins</Link>
          <Link to="/bundles">Bundles</Link>
          <Link to="/buddies">Buddies</Link>
          <Link to="/player-cards">Player Cards</Link>
          <Link to="/player-titles">Player Titles</Link>
          <Link to="/sprays">Sprays</Link>
        </StyledNavbar>
      </StyledHeader>
    </>
  )
}

export default Header