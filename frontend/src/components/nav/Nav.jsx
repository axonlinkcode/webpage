import { Link } from "react-scroll";
import { assets } from "../../assets/assets";
import Button from "../buttons/Button";
import './Nav.css';

const Nav = () => {
  return (
    <nav className="nav__container">
      <div className="nav-inner">
        {/* Logo + Button (mobile only) */}
        <div className="nav__container--logo">
          <img src={assets.logo} alt="Logo" />
          <Button name='Take survey' link='/forms'
            className="btn__component" />
        </div>


        {/* Nav Links */}
        <div className="nav__container--list">
          <div className="nav-list">
            <Link to="home" smooth={true} duration={500} offset={-100} activeClass="active" spy={true}>
              Home
            </Link>
            <Link to="services" smooth={true} duration={500} offset={-100} activeClass="active" spy={true}>
              Services
            </Link>
            <Link to="products" smooth={true} duration={500} offset={-100} activeClass="active" spy={true}>
              Products
            </Link>
            <Link to="team" smooth={true} duration={500} offset={-100} activeClass="active" spy={true}>
              Team
            </Link>
          </div>
        </div>

        {/* Button (desktop only) */}
        {/* <div className="nav__container--btn"> */}
        <Button name='Take survey' link='/forms'
          className="btn__component-list" />
        {/* </div> */}
      </div>
    </nav>
  );
};

export default Nav;