import { Link } from "react-scroll";
import { assets } from "../../assets/assets";
import './Nav.css';

const Nav = () => {
    return (
        <nav className="nav">
            <ul className="nav__container">
                {/* Logo */}
                <li className="nav__container--logo">
                    {/* <div className="nav-logo"> */}
                        <img src={assets.logo} alt="Logo" />
                    {/* </div> */}
                </li>

                {/* Nav Links */}
                <li className="nav__container--list">
                    <div className="nav-list">
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            offset={-100}
                            activeClass="active"
                            spy={true}
                        >
                            Home
                        </Link>
                        <Link
                            to="services"
                            smooth={true}
                            duration={500}
                            offset={-100}
                            activeClass="active"
                            spy={true}
                        >
                            Services
                        </Link>
                        <Link
                            to="products"
                            smooth={true}
                            duration={500}
                            offset={-100}
                            activeClass="active"
                            spy={true}
                        >
                            Products
                        </Link>
                        <Link
                            to="team"
                            smooth={true}
                            duration={500}
                            offset={-100}
                            activeClass="active"
                            spy={true}
                        >
                            Team
                        </Link>
                    </div>
                </li>

                {/* Contact Button */}
                <li className="nav__container--btn">
                    <div className="nav-btn">
                        <a href="/form">Get in touch</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
