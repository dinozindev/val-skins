import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Header from "./Components/Header/Header"
import Skins from "./pages/Skins/Skins"
import Bundles from "./pages/Bundles/Bundles"
import Buddies from "./pages/Buddies/Buddies"
import PlayerCards from "./pages/PlayerCards/PlayerCards"
import PlayerTitles from "./pages/PlayerTitles/PlayerTitles"
import Sprays from "./pages/Sprays/Sprays"
import Footer from "./Components/Footer/Footer"

const App = () => {
  return (
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
  )
}

export default App
