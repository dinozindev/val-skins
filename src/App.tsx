import { Route, Routes } from "react-router-dom"
import Home from "./Components/Home/Home"
import Header from "./Components/Header/Header"
import Skins from "./Components/Skins/Skins"
import Bundles from "./Components/Bundles/Bundles"
import Buddies from "./Components/Buddies/Buddies"
import PlayerCards from "./Components/PlayerCards/PlayerCards"
import PlayerTitles from "./Components/PlayerTitles/PlayerTitles"
import Sprays from "./Components/Sprays/Sprays"
import Footer from "./Components/Footer/Footer"

const App = () => {
  return (
    <>
    <main id="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/skins" element={<Skins />}></Route>
        <Route path="/bundles" element={<Bundles />}></Route>
        <Route path="/buddies" element={<Buddies />}></Route>
        <Route path="/player-cards" element={<PlayerCards />}></Route>
        <Route path="/player-titles" element={<PlayerTitles />}></Route>
        <Route path="/sprays" element={<Sprays />}></Route>
      </Routes>
      <Footer />
      </main>
    </>
  )
}

export default App
