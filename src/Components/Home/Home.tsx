import { Link } from "react-router-dom"
import styled from "styled-components"

const HomeMain = styled.main`
  height: 80vh;
  display:flex;
  justify-content: center;
`

const HomeDiv = styled.div`
  display:flex; 
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 4rem 0;
  h2 {
    font-size: 48px;
  }
  b {
    color: #FF5062;
    font-weight: 700;
  }
  a {
    background-color: #E2263C;
    text-decoration: none;
    padding: 0.75rem 2rem;
    border-radius: 4px;
    cursor: pointer;
  }

  a:hover {
    background-color: #682A36;
    transition: 0.2s;
  }
`

const Home = () => {
  return (
    <>
    <HomeMain>
       <HomeDiv>
          <h2>Welcome to Val<b>Skins</b>!</h2>
          <Link to="/skins">Check skins</Link>
        </HomeDiv> 
    </HomeMain>
    </>
  )
}

export default Home