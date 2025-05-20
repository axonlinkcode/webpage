import './Footer.css'
import { assets } from "../../assets/assets";
const Footer = () => {
    return (
        <footer className="footer">
                <ul className='footer__top-list'>
                    <li>
                        <div>
                            <a href="#home">Home</a>
                            <a href="#services">Services</a>
                            <a href="#products">Products</a>
                            <a href="#team">Team</a>
                        </div>
                    </li>
                    <li>
                        <img src={assets.logowhite} alt="" />
                    </li>
                </ul>
            <div className="footer__bottom">
                <div className="footer__bottom-left">
                    <p>© 2025 axonlink. All rights reserved</p>
                </div>
                <div className="footer__bottom-right">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
                <div className='footer__bottom-social'>
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
                </div>
            </div>
        </footer>
    );
};

export default Footer;