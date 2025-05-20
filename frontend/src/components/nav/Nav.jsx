import Scrollspy from 'react-scrollspy';
import { assets } from "../../assets/assets";
import './Nav.css'

const Nav = () => {
    return (
        <nav>
            <ul className="nav__container">
                <li className="nav__container--logo">
                    <div className="nav-logo">
                        <img src={assets.logo} alt="" />
                    </div>
                </li>
                <li className="nav__container--list">
                    <Scrollspy
                        className="nav-list"
                        items={['home', 'services', 'products', 'team']}
                        currentClassName="active"
                        offset={-100}
                    >
                        <a href="#home">Home</a>
                        <a href="#services">Services</a>
                        <a href="#products">Products</a>
                        <a href="#team">Team</a>
                    </Scrollspy>
                </li>
                <li className="nav__container--btn">
                    <div className="nav-btn">
                        <a href="#">Get in touch</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;