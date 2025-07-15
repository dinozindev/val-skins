import { Link } from "react-router-dom"
import styled from "styled-components"
import logo from "/img/vlrlogo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

const StyledHeader = styled.header`
    width: 100%;
    background-color: #0F1923;
    height: 7rem;
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
    
    @media only screen and (max-width: 768px) {
      justify-content: space-between;
      a:first-child {
      h1 {
        font-size: 36px;
      }
    }
  }

    @media (min-width: 769px) and (max-width: 1279px) {
      align-items: center;
  }


`

const LogoLink = styled(Link)`
  width: 40%;
  margin-left: 1rem;
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

  @media only screen and (max-width: 768px) {
    img {
      width: 18%;
    } 
  }

  @media (min-width: 769px) and (max-width: 1279px) {
     justify-content: center;
     img {
      width: 12%;
     }
  }
`

const StyledNavbar = styled.nav<{ $menu : boolean }>`
    display: flex;
    gap: 2rem;
    @media only screen and (max-width: 768px) {
      display: ${(props) => (props.$menu == false ? "none" : "flex")};
      width: 100%;
      text-align: end;
      background-color: #0F1923;
      flex-direction: column;
      position: absolute;
      top: 90px;
      padding: 1rem 0;
      a {
        margin: 0 1rem;
      }
    }
    @media (min-width: 769px) and (max-width: 1279px) {
      justify-content: center;
    }
`

const StyledHamburger = styled(FontAwesomeIcon)`
    display: none;
    font-size: 32px;
    margin: 1rem;
    @media only screen and (max-width: 768px) {
      display: block;
    }
`

const Header = () => {

  const [menu, setMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    if (menu) {
      setMenu(false);
    } else {
      setMenu(true);
    }
  }

  return (
    <>
      <StyledHeader>
        <LogoLink to="/">
        <Logo>
          <img src={logo} alt="valorant logo"/>
          <h1>Val<span>Skins</span></h1>
        </Logo>
        </LogoLink>
        <StyledHamburger icon={faBars} onClick={() => toggleMenu()}/>
        <StyledNavbar $menu={menu}>
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