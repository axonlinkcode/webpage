import './footer.css'
import { assets } from "../../assets/assets";
const Footer = () => {
    return (
        <footer className="footer">
            <ul className='footer__top'>
                <li>
                    <a href="#home">Home</a>
                    <a href="#services">Services</a>
                    <a href="#products">Products</a>
                    <a href="#team">Team</a>
                </li>
                <li className='footer__logo' >
                    <img src={assets.logowhite} alt="logo" />
                </li>
            </ul>
            <ul className="footer__bottom">
                <li className='footer__bottom-social'>
                    <a href="#"
                        type='email'>
                        axonlink@axonlink.ai
                    </a>
                    <a href="#">
                        <img src={assets.linkedin} alt="" />
                    </a>
                    <a href="#">
                        <img src={assets.x} alt="" />
                    </a>
                </li>
            </ul>
            <ul className="footer__bottom-policy">
                <a>© 2025 axonlink. All rights reserved</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </ul>

        </footer>
    );
};

export default Footer;