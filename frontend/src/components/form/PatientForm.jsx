import { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import axios from 'axios';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    deviceType: '',
    location: '',
    infoSources: [],
    trialParticipation: '',
    accessDifficulty: 0,
    biggestChallenge: '',
    usesInternetHealth: '',
    onlineActivities: [],
    noInternetReasons: [],
    comfortLevel: 0,
    internetReliability: 0,
    communicationPreferences: [],
    desiredFeatures: [],
    privacyConcerns: '',
    smsWillingness: '',
    systemPriorities: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 13;
  const [showModal, setShowModal] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const requiredFields = {
    1: 'deviceType',
    2: 'location',
    3: 'infoSources',
    4: 'trialParticipation',
    5: 'accessDifficulty',
    7: 'usesInternetHealth',
    8: 'comfortLevel',
    9: 'internetReliability'
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
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const key = requiredFields[currentStep];
    const value = formData[key];

    if (currentStep === 8) {
      if (formData.usesInternetHealth === 'Yes' && formData.onlineActivities.length === 0) {
        alert('Please select at least one health-related activity you have done online.');
        return;
      }
      if (formData.usesInternetHealth === 'No' && formData.noInternetReasons.length === 0) {
        alert('Please select at least one reason you do not use online services.');
        return;
      }
    } else if (key && (value === '' || (Array.isArray(value) && value.length === 0))) {
      alert('Please answer this question before proceeding.');
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const API = import.meta.env.VITE_API_BASE_URL;
    axios.post(`${API}/patient`, formData)
      .then(() => {
        setShowModal(true); // Show thank you modal
        setSubmissionError('');
      })
      .catch(err => {
        console.error('Submission error', err);
        setSubmissionError('Something went wrong. Please try again.');
      });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  //   setShowModal(true);
  //   setSubmissionError('');
  // };


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
            {['Urban', 'Suburban', 'Rural'].map((option, i) => (
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
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <label>4. Have you ever considered or joined a clinical trial?</label>
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
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <label>5. How difficult is it to access specialist care?
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
      case 6:
        return (
          <div className="form-group">
            <label>6. What is your biggest challenge accessing care or joining a trial?</label>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              rows={4}
            />
          </div>
        );
      case 7:
        return (
          <div className="form-group">
            <label>7. Do you use the internet for health activities?</label>
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
      case 8:
        return formData.usesInternetHealth === 'Yes' ? (
          <div className="form-group">
            <label>7a. What health-related activities have you done online?</label>
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
          </div>
        ) : (
          <div className="form-group">
            <label>7b. Why don’t you use online services?</label>
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
      case 9:
        return (
          <div className="form-group">
            <label>8. How comfortable are you with mobile apps for healthcare?
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
      case 10:
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
      case 11:
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
      case 12:
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
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='survey-body'>
      <Link to='/forms' className="arrow-link">← Back to Forms</Link>
      <div className="survey-container">
        <form onSubmit={handleSubmit} className="survey-form">
          <div className="survey-header">
            <h1>Patient Experience Survey</h1>
            <p>
              Help us design a better system for healthcare and trials in Nigeria.
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
          </div>

          <div className="form-footer">
            {currentStep > 1 && <button type="button" onClick={handleBack}>Back</button>}
            {currentStep < totalSteps ? (
              <button type="button" onClick={handleNext}>Next</button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>Thank you!</h2>
            <p>Your responses have been recorded.</p>
            <Link to="/" className="modal-btn">← Back to Home</Link>
          </div>
        </div>
      )}

      {submissionError && (
        <div className="error-message">
          <p>{submissionError}</p>
        </div>
      )}

    </div>
  );
};

export default PatientForm;

