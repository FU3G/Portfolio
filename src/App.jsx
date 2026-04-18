import { Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import Certifications from "./pages/Certifications"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"

import ScrollToTop from "./components/ScrollToTop"

function App() {

  return (

    <>
      {/* Fond animé */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="bg-blob bg-blob--1"></div>
        <div className="bg-blob bg-blob--2"></div>
        <div className="bg-blob bg-blob--3"></div>
        <div className="bg-blob bg-blob--4"></div>
      </div>

      {/* Grain film */}
      <div className="bg-grain" aria-hidden="true"></div>

      <Navbar />

      <ScrollToTop />

      <main>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

      </main>

      <Footer />

    </>

  )

}

export default App
