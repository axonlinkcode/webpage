import { assets } from "../../assets/assets";
import './Nav.css'

const Nav = () => {
    return (
        <nav>
            <ul className="nav">
                <li>
                    <div className="nav-logo">
                        <img src={assets.logo} alt="" />
                    </div>
                </li>
                <li>
                    <div className="nav-list">
                        <a href="#">Home</a>
                        <a href="#">Services</a>
                        <a href="#">Products</a>
                        <a href="#">Team</a>
                    </div>
                </li>
                <li>
                    <div className="nav-btn">
                        <a href="#">Get in touch</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;