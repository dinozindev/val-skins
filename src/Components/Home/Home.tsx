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
    font-size: 72px;
    text-align: center;
  }
  b {
    color: #FF5062;
    font-weight: 700;
  }
  a {
    background-color: #E2263C;
    text-decoration: none;
    padding: 0.75rem 2rem;
    border-radius: .5rem;
    cursor: pointer;
    font-size: 24px;
    width: 40%;
    text-align: center;
  }

  a:hover {
    background-color: #682A36;
    transition: 0.2s;
  }

  @media only screen and (max-width: 1279px) {
    h2 {
      font-size: 60px;
    }
  }

  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 50px;
    }
  }

  @media only screen and (max-width: 480px) {
    a {
      font-size: 20px;
    }
  }
`

const Home = () => {
  return (
    <>
    <HomeMain>
       <HomeDiv>
          <h2>Welcome to Val<b>Skins</b>!</h2>
          <Link to="/skins">Check out skins</Link>
        </HomeDiv> 
    </HomeMain>
    </>
  )
}

export default Home