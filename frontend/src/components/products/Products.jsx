import './things.css'
import CardStack from '../cardStack/CardStack';
import link from '../../assets/link logo.png'
import Links from '../links/Links';


const Products = () => {

    return (
        <div className='product' id='products'>
            <div className='product-top'>
                <div className='product-top-image'>
                    <img src={link} alt="" />
                    <h3>
                        Transforming Clinical Care Delivery & Research
                    </h3>
                    <p>
                        Our suite of products include a robust clinical trial operations
                        platform, a patient engagement app, and analytics dashboards
                        that turn health data into actionable insights.
                        Each solution is being built with compliance,
                        interoperability, and user experience at its core—helping
                        teams move faster and patients engage more deeply in their
                        care.
                    </p>
                </div>
                <div className='product-top-card'>
                    <CardStack />
                </div>
            </div>
            <div className='product-bottom'>
               <Links className='product-links' />
            </div>
        </div>
    );

};

export default Products;