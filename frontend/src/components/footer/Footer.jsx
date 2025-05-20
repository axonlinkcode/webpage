import './Footer.css'
import { assets } from "../../assets/assets";
const Footer = () => {
    return (
        <footer className="footer">
            <div className='footer__top'>
                <ul className='footer__top-list'>
                    <li>
                        <div>
                            <a href="#">Home</a>
                            <a href="#">Services</a>
                            <a href="#">Products</a>
                            <a href="#">Team</a>
                        </div>
                    </li>
                    <li className="footer__top-list-img">
                        <img src={assets.logo} alt="" />
                    </li>
                </ul>
            </div>
            <div className="footer__bottom">
                <div className="footer__bottom-left">
                    <p>© 2023 All rights reserved</p>
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