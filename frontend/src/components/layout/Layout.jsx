import Nav from "../nav/Nav"
import Footer from "../footer/Footer"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
