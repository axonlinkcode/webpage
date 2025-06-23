import { Link } from "react-scroll";
import { assets } from "../../assets/assets";
import Button from "../buttons/Button";
import './Nav.css';

const Nav = () => {
    return (
        // <nav>
            <ul className="nav__container">
                <li className="nav__container--logo">
                    <img src={assets.logo} alt="Logo" />
                    <Button name="Get in touch" link="/forms" className='btn__component' />
                </li>

                {/* Nav Links */}
                <li className="nav__container--list">
                    <div className="nav-list">
                        <Link
                            to="home"
                            smooth={true}
                            duration={500}
                            offset={-200}
                            activeClass="active"
                            spy={true}
                        >
                            Home
                        </Link>
                        <Link
                            to="services"
                            smooth={true}
                            duration={500}
                            offset={-200}
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
                    <Button name="Get in touch" link="/forms" className='btn__component-list' />
                </li>
            </ul>
        // </nav>
    );
};

export default Nav;
