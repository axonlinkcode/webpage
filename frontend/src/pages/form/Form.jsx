import { Link } from 'react-router-dom'
import './form.css'
import "remixicon/fonts/remixicon.css";


const Form = () => {
    return (
        <div className="form-container">
            <Link to='/' className="back-link">← Back Home</Link>
            
            <div className='form-card'>
                <h2>Your experience and insights are crucial!</h2>
                <p className="intro-text">
                    We are developing a new mobile-friendly system to help patients in Nigeria more easily
                    find specialist care and discover relevant clinical trials.
                    Your responses will directly inform how we build this system to meet your needs.
                    All your answers will be kept confidential.
                </p>

                <div className='form-options'>
                    <Link to='/forms/patient' className="form-btn patient-btn">
                        <span className="btn-icon">👩‍⚕️</span>
                        <span className="btn-text">Patient Survey</span>
                        <span className="btn-desc">For patients seeking care or trials</span>
                    </Link>
                    
                    <Link to='/forms/clinician' className="form-btn clinician-btn">
                        <span className="btn-icon">
                            <i class="ri-stethoscope-line"></i>
                        </span>
                        <span className="btn-text">Clinician Survey</span>
                        <span className="btn-desc">For doctors and healthcare providers</span>
                    </Link>
                    
                    <Link to='/forms/CRO' className="form-btn cro-btn">
                        <span className="btn-icon">
                           <i className="ri-hospital-line"></i>
                        </span>
                        <span className="btn-text">Research Survey</span>
                        <span className="btn-desc">For clinical research organizations</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Form
