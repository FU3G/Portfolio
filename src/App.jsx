import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Contact from "./pages/Contact"
import About from "./pages/About"
import NotFound from "./pages/NotFound"

import ScrollToTop from "./components/ScrollToTop"

function App() {

  return (

    <>
      <Navbar />

      <ScrollToTop />

      <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </main>

      <Footer />

    </>

  )

}

export default App