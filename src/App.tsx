import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home/Home"
import Header from "./Components/Header/Header"
import Skins from "./Components/Skins/Skins"

const App = () => {
  return (
    <>
    <main id="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/skins" element={<Skins />}></Route>
      </Routes>
      </main>
    </>
  )
}

export default App
