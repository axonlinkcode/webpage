import { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import axios from 'axios';

const PatientForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  // const [submissionError, setSubmissionError] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    deviceType: '',
    location: '',
    infoSources: [],
    trialParticipation: '',
    accessDifficulty: 0,
    biggestChallenge: '',
    knowClinicalTrial: '',
    usesInternetHealth: '',
    onlineActivities: [],
    noInternetReasons: [],
    comfortLevel: 0,
    internetReliability: 0,
    communicationPreferences: [],
    desiredFeatures: [],
    privacyConcerns: '',
    smsWillingness: '',
    systemPriorities: [],
    email: '',
    enrollDifficulty: 0,
    trialChallenge: '',
    consultantChallenge: ''
  });

  const totalSteps = 16;

  const requiredFields = {
    1: 'deviceType',
    2: 'location',
    3: 'infoSources',
    4: 'knowClinicalTrial',
    5: 'trialParticipation', 
    6: 'enrollDifficulty',  
    7: 'accessDifficulty',
    8: 'biggestChallenge',
    9: 'consultantChallenge',
    10: 'usesInternetHealth',
    11: 'onlineActivities',
    12: 'noInternetReasons',
    13: 'comfortLevel',
    14: 'internetReliability'
  };


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter(item => item !== value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseInt(value) : value
      }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const key = requiredFields[currentStep];
    if (!key) return true;

    const value = formData[key];
    let isValid = true;
    const newErrors = {};

    if (Array.isArray(value) && value.length === 0) {
      newErrors[key] = 'Please select at least one option';
      isValid = false;
    } else if (!value || value === '' || value === 0) {
      newErrors[key] = 'This field is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    // STEP 4 ANS(No)
    if (currentStep === 4 && formData.knowClinicalTrial === 'No') {
        setCurrentStep(7);
        return;
    }
    if (currentStep === 7 && formData.knowClinicalTrial === 'No') {
      setCurrentStep(9); 
      return;
    }

    // STEP 4 ANS(Yes)
    if (currentStep === 4 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(5);
        return;
      }
    if (currentStep === 5 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(6);
        return;
      }
    if (currentStep === 6 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(8);
        return;
      }
    if (currentStep === 8 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(7);
        return;
      }
    
    if (currentStep === 7 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(9);
        return;
      }
    
    if (currentStep === 9 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(10);
        return;
      }
    if (currentStep === 11 && formData.knowClinicalTrial === 'Yes' ){
        setCurrentStep(13);
        return;
      }
    if (currentStep === 10 && formData.usesInternetHealth === 'No' ){
        setCurrentStep(12);
        return;
      }   
        setCurrentStep(prev => prev + 1);
  }



 const handleBack = () => {
  // Case 16 → 15
  if (currentStep === 16) {
    setCurrentStep(15);
    return;
  }

  // Case 15 → 14
  if (currentStep === 15) {
    setCurrentStep(14);
    return;
  }

  // Case 14 → 13
  if (currentStep === 14) {
    setCurrentStep(13);
    return;
  }

  // Case 13 → 12 or 11 based on internet usage
  if (currentStep === 13) {
    if (formData.usesInternetHealth === 'No') {
      setCurrentStep(12);
      return;
    } else {
      setCurrentStep(11);
      return;
    }
  }

  // Case 12 → 10 (no internet users skipped 11)
  if (currentStep === 12) {
    setCurrentStep(10);
    return;
  }

  // Case 11 → 10
  if (currentStep === 11) {
    setCurrentStep(10);
    return;
  }

  // Case 10 → 9
  if (currentStep === 10) {
    setCurrentStep(9);
    return;
  }

  // Case 9 → 7 (both yes/no go to 7 before 9)
  if (currentStep === 9) {
    setCurrentStep(7);
    return;
  }

  // Case 7 → 8 (Yes), → 4 (No)
  if (currentStep === 7) {
    if (formData.knowClinicalTrial === 'Yes') {
      setCurrentStep(8);
      return;
    } else {
      setCurrentStep(4);
      return;
    }
  }

  // Case 8 → 6 (Yes)
  if (currentStep === 8) {
    setCurrentStep(6);
    return;
  }

  // Case 6 → 5
  if (currentStep === 6) {
    setCurrentStep(5);
    return;
  }

  // Case 5 → 4
  if (currentStep === 5) {
    setCurrentStep(4);
    return;
  }

  // Case 4 → 3
  if (currentStep === 4) {
    setCurrentStep(3);
    return;
  }

  // Case 3 → 2
  if (currentStep === 3) {
    setCurrentStep(2);
    return;
  }

  // Case 2 → 1
  if (currentStep === 2) {
    setCurrentStep(1);
    return;
  }

  // Default fallback (e.g., already at 1)
  setCurrentStep(prev => Math.max(prev - 1, 1));
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateCurrentStep()) {

      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
     alert('Please enter a valid email address.');
        return;
      }

      // setShowModal(true);
      // setSubmissionError('');

      const API = import.meta.env.VITE_API_BASE_URL;
      try {
        const res = await axios.post(`${API}/patient`, formData);
        // console.log('Form submitted successfully:', res.data);
        setShowModal(true);
        // setSubmissionError('');
      } catch (err) {
        console.error('Submission error', err.response?.data || err.message);
        setShowModal(false);
        alert('Something went wrong. Please try again.');
      }
    }
  };


  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-group">
            <label>1. What kind of mobile device do you mainly use?</label>
            {['Basic phone', 'Smartphone', 'Tablet/computer', 'No regular device'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="deviceType"
                  value={option}
                  checked={formData.deviceType === option}
                  onChange={() => handleRadioChange('deviceType', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <label>2. Where do you live?</label>
            {['City', 'Town', 'Village'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="location"
                  value={option}
                  checked={formData.location === option}
                  onChange={() => handleRadioChange('location', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className="form-group">
            <label>3. How do you find info about doctors/trials? (Select all that apply)</label>
            {['Referral', 'Internet search', 'Social media', 'Radio/TV', 'Family/friends', 'Research org', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="infoSources"
                  value={option}
                  checked={formData.infoSources.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.infoSources && (
              <span className="error">{errors.infoSources}</span>
            )}
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <label>4. Do you know what a clinical trial is ?</label>
            {['Yes', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="knowClinicalTrial"
                  value={option}
                  checked={formData.knowClinicalTrial === option}
                  onChange={() => handleRadioChange('knowClinicalTrial', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.knowClinicalTrial && (
              <span className="error">{errors.knowClinicalTrial}</span>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <label>5. Have you ever considered or joined a clinical trial?</label>
            {['Yes - joined', 'Yes - considered', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="trialParticipation"
                  value={option}
                  checked={formData.trialParticipation === option}
                  onChange={() => handleRadioChange('trialParticipation', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.trialParticipation && (
              <span className="error">{errors.trialParticipation}</span>
            )}
          </div>
        );
      case 6:
        return (
          <div className="form-group">
            <label>5a. How difficult is it to be enrolled into a Clinical trial?
              <span className='form-group-span'>(5.Very difficult,1.Easy)</span>
            </label>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="enrollDifficulty"
                  value={num}
                  checked={formData.enrollDifficulty === num}
                  onChange={() => handleRadioChange('enrollDifficulty', num)}
                /> <span className="radio-text">{num}</span>
              </label>
            ))}
          </div>
        );
      case 7:
        return (
          <div className="form-group">
            <label>6. How difficult is it to access Consultant(Specialist) care?
              <span className='form-group-span'>(5.Very difficult,1.Easy)</span>
            </label>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="accessDifficulty"
                  value={num}
                  checked={formData.accessDifficulty === num}
                  onChange={() => handleRadioChange('accessDifficulty', num)}
                /> <span className="radio-text">{num}</span>
              </label>
            ))}
          </div>
        );
      case 8:
        return (
          <div className="form-group">
            <label>5b. What was your biggest challenge accessing Clinical trial?</label>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              rows={4}
            />
          </div>
        );
    
      case 9:
        return (
          <div className="form-group">
            <label>7. What was your biggest challenge accessing Consultant (Specialist) care?</label>
            <textarea
              name="consultantChallenge"
              value={formData.consultantChallenge}
              onChange={handleChange}
              rows={4}
            />
          </div>
        );
    

      case 10:
        return (
          <div className="form-group">
            <label>8. Do you use the internet for health activities?</label>
            {['Yes', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="usesInternetHealth"
                  value={option}
                  checked={formData.usesInternetHealth === option}
                  onChange={() => handleRadioChange('usesInternetHealth', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
          </div>
        );
      case 11:
        return (
          <div className="form-group">
            <label>8a. What health-related activities have you done online?</label>
            {['Visit hospital site', 'Health app', 'WhatsApp group', 'SMS alerts', 'Search info', 'Book appointment', 'Lab results', 'Chat with doctor', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="onlineActivities"
                  value={option}
                  checked={formData.onlineActivities.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.onlineActivities && (
              <span className="error">{errors.onlineActivities}</span>
            )}
          </div>
        );
      case 12:
        return (
          <div className="form-group">
            <label>8b. Why don't you use online services?</label>
            {['Cost', 'Network issue', 'Tech difficulty', 'Prefer in-person', 'Not aware', 'Privacy concern', 'Language barrier', 'Not interested', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="noInternetReasons"
                  value={option}
                  checked={formData.noInternetReasons.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
          </div>
        );
      case 13:
        return (
          <div className="form-group">
            <label>9. How comfortable are you with mobile apps for healthcare?
              <span className='form-group-span'>(5.Very Comfortable,1.Not Comfortable)</span>
            </label>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="comfortLevel"
                  value={num}
                  checked={formData.comfortLevel === num}
                  onChange={() => handleRadioChange('comfortLevel', num)}
                /> <span className="radio-text">{num}</span>
              </label>
            ))}
          </div>
        );
      case 14:
        return (
          <div className="form-group">
            <label>9. How reliable is internet in your area?
              <span className='form-group-span'>(5.Very Reliable,1.Not Reliable)</span>
            </label>
            {[1, 2, 3, 4, 5].map(num => (
              <label key={num}>
                <input
                  type="radio"
                  name="internetReliability"
                  value={num}
                  checked={formData.internetReliability === num}
                  onChange={() => handleRadioChange('internetReliability', num)}
                /> <span className="radio-text">{num}</span>
              </label>
            ))}
          </div>
        );
      case 15:
        return (
          <div className="form-group">
            <label>10. What features would help you most? (Select up to 3)</label>
            {['Info on doctors', 'Trial alerts', 'Book appointment', 'Reminders', 'Chat with doctor', 'Track referrals', 'View records', 'Understand info', 'Transport help', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="desiredFeatures"
                  value={option}
                  checked={formData.desiredFeatures.includes(option)}
                  disabled={formData.desiredFeatures.length >= 3 && !formData.desiredFeatures.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
          </div>
        );
      case 16:
        return (
          <div className="form-group">
            <label>11. Would you use SMS for health updates if internet is unreliable?</label>
            {['Yes', 'No', 'Maybe'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="smsWillingness"
                  value={option}
                  checked={formData.smsWillingness === option}
                  onChange={() => handleRadioChange('smsWillingness', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}

            <div className='email-input'>
              <input
                type="email"
                name="email"
                placeholder="Please Enter Email"
                className="form-email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>


          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='survey-body'>
      {/* <div className="survey-container"> */}
      <form onSubmit={handleSubmit} className="survey-form">
        <Link to='/forms' className="arrow-link">← Back to Forms</Link>
        <div className="survey-header">
          <h1>Patient Experience Survey</h1>
          <p>
            Your experience and insights are crucial! We are developing a new mobile-friendly system to help patients in Nigeria and across Africa more easily find specialist care and discover relevant clinical trials.
          </p>
          <p>
            Your responses will directly inform how we build this system to meet your needs. All your answers will be kept confidential.
          </p>
        </div>

        <div className="progress-tracker">
          <p>Question {currentStep} of {totalSteps}</p>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="survey-questions">
          {renderQuestion()}
          {requiredFields[currentStep] && (
            <p className={`required-note ${errors[requiredFields[currentStep]] ? 'error' : ''}`}>
              * This question is required
            </p>
          )}
        </div>

        {/* ✅ Inline email input with its own error */}

        <div className="form-footer">
          {currentStep > 1 && (
            <button type="button" onClick={handleBack}>Back</button>
          )}

          {currentStep === 16 && (
            <button type="submit">Submit</button>
          )}

          {currentStep < 16 && (
            <button type="button" onClick={handleNext}>Next</button>
          )}
        </div>
      </form>
      {/* </div> */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Thank you!</h2>
            <p>Your responses have been recorded.</p>
            <Link to="/" className="modal-btn">← Back to Home</Link>
          </div>
        </div>
      )}

      {/* {submissionError && (
        <div className="error-message">
          <p>{submissionError}</p>
        </div>
      )} */}
    </div>
  );
};

export default PatientForm

