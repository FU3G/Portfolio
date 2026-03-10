import { NavLink } from "react-router-dom"
import ThemeToggle from "./ThemeToggle"

function Navbar() {
  return (
    <nav>
      <h2>gp</h2>

      <ul>
        <li>
          <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
            Accueil
          </NavLink>
        </li>

        <li>
          <NavLink to="/projects" className={({isActive}) => isActive ? "active" : ""}>
            Projets
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className={({isActive}) => isActive ? "active" : ""}>
            À propos
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className={({isActive}) => isActive ? "active" : ""}>
            Contact
          </NavLink>
        </li>
      </ul>
      <ThemeToggle />
    </nav>
  )
}

export default Navbar