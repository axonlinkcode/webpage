import './footer.css'
import { assets } from "../../assets/assets";
const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer__top'>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#products">Products</a></li>
                    <li><a href="#team">Team</a></li>
                </ul>
                <img src={assets.logowhite} alt="logo" />
            </div>

            <ul className="footer__bottom">
                <li className="footer__bottom-social">
                    <a href="mailto:axonlink@axonlink.ai">axonlink@axonlink.ai</a>
                </li>
                <li className="footer__bottom-social">
                    <a href="#">
                        <img src={assets.linkedin} alt="LinkedIn" />
                    </a>
                </li>
                <li className="footer__bottom-social">
                    <a href="#">
                        <img src={assets.x} alt="X (formerly Twitter)" />
                    </a>
                </li>
            </ul>

            <ul className="footer__bottom-policy">
                <li>© 2025 axonlink. All rights reserved</li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
            </ul>
        </footer>
    );
};

export default Footer;