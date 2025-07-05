import { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import axios from 'axios';

const ClinicianForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    professionalRole: '',
    facilityTypes: [],
    trialInvolvement: '',
    workDevices: [],
    referralDifficulty: '',
    careCoordinationChallenges: '',
    trialChallenges: '',
    usesDigitalTools: '',
    toolNames: '',
    toolLimitations: '',
    trainingReceived: '',
    toolImprovementSuggestions: '',
    smsWillingness: '',
    desiredFeatures: []
  });

  const totalSteps = 13;

  const requiredFields = {
    1: 'professionalRole',
    2: 'facilityTypes',
    3: 'trialInvolvement',
    4: 'workDevices',
    5: 'referralDifficulty',
    6: 'careCoordinationChallenges',
    7: 'trialChallenges',
    8: 'usesDigitalTools',
    12: 'toolImprovementSuggestions',
    13: 'desiredFeatures'
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
        [name]: value
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
      newErrors[key] = true; // Just set to true to trigger error state
      isValid = false;
    } else if (!value || value === '') {
      newErrors[key] = true; // Just set to true to trigger error state
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 8 && formData.usesDigitalTools === 'No') {
      setCurrentStep(11);
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (currentStep === 11 && formData.usesDigitalTools === 'No') {
      setCurrentStep(8);
      return;
    }
    
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateCurrentStep()) {
      console.log('Form submitted:', formData);
      setShowModal(true);
      setSubmissionError('');
      
      // Uncomment for actual API submission
      // const API = import.meta.env.VITE_API_BASE_URL;
      // axios.post(`${API}/clinician`, formData)
      //   .then(() => {
      //     setShowModal(true);
      //     setSubmissionError('');
      //   })
      //   .catch(err => {
      //     console.error('Submission error', err);
      //     setSubmissionError('Something went wrong. Please try again.');
      //   });
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-group">
            <label>1. What is your professional role?</label>
            {['Doctor', 'Nurse', 'Researcher', 'Trial Coordinator', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="professionalRole"
                  value={option}
                  checked={formData.professionalRole === option}
                  onChange={() => handleRadioChange('professionalRole', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.professionalRole && (
              <span className="error">{errors.professionalRole}</span>
            )}
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <label>2. What type of facility do you work in? (Select all that apply)</label>
            {['Public hospital', 'Private hospital', 'Clinic', 'Research center', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="facilityTypes"
                  value={option}
                  checked={formData.facilityTypes.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.facilityTypes && (
              <span className="error">{errors.facilityTypes}</span>
            )}
          </div>
        );
      case 3:
        return (
          <div className="form-group">
            <label>3. Are you involved in clinical trials?</label>
            {['Yes', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="trialInvolvement"
                  value={option}
                  checked={formData.trialInvolvement === option}
                  onChange={() => handleRadioChange('trialInvolvement', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.trialInvolvement && (
              <span className="error">{errors.trialInvolvement}</span>
            )}
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <label>4. What devices do you use at work? (Select all that apply)</label>
            {['Desktop', 'Laptop', 'Tablet', 'Smartphone', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="workDevices"
                  value={option}
                  checked={formData.workDevices.includes(option)}
                  onChange={handleChange}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.workDevices && (
              <span className="error">{errors.workDevices}</span>
            )}
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <label>5. How difficult is it to refer a patient to a specialist?</label>
            <textarea
              name="referralDifficulty"
              value={formData.referralDifficulty}
              onChange={handleChange}
              rows={4}
            />
            {errors.referralDifficulty && (
              <span className="error">{errors.referralDifficulty}</span>
            )}
          </div>
        );
      case 6:
        return (
          <div className="form-group">
            <label>6. What are your biggest challenges coordinating care?</label>
            <textarea
              name="careCoordinationChallenges"
              value={formData.careCoordinationChallenges}
              onChange={handleChange}
              rows={4}
            />
            {errors.careCoordinationChallenges && (
              <span className="error">{errors.careCoordinationChallenges}</span>
            )}
          </div>
        );
      case 7:
        return (
          <div className="form-group">
            <label>7. What are your main challenges joining or running clinical trials?</label>
            <textarea
              name="trialChallenges"
              value={formData.trialChallenges}
              onChange={handleChange}
              rows={4}
            />
            {errors.trialChallenges && (
              <span className="error">{errors.trialChallenges}</span>
            )}
          </div>
        );
      case 8:
        return (
          <div className="form-group">
            <label>8. Do you currently use any digital tools for work?</label>
            {['Yes', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="usesDigitalTools"
                  value={option}
                  checked={formData.usesDigitalTools === option}
                  onChange={() => handleRadioChange('usesDigitalTools', option)}
                /> <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.usesDigitalTools && (
              <span className="error">{errors.usesDigitalTools}</span>
            )}
          </div>
        );
      case 9:
        return formData.usesDigitalTools === 'Yes' ? (
          <div className="form-group">
            <label>8a. What tools or platforms do you use?</label>
            <textarea
              name="toolNames"
              value={formData.toolNames}
              onChange={handleChange}
              rows={3}
            />
          </div>
        ) : null;
      case 10:
        return formData.usesDigitalTools === 'Yes' ? (
          <div className="form-group">
            <label>8b. What are the limitations of the tools you use?</label>
            <textarea
              name="toolLimitations"
              value={formData.toolLimitations}
              onChange={handleChange}
              rows={4}
            />
          </div>
        ) : null;
      case 11:
        return (
          <div className="form-group">
            <label>9. Have you received training on any tools?</label>
            <textarea
              name="trainingReceived"
              value={formData.trainingReceived}
              onChange={handleChange}
              rows={4}
            />
          </div>
        );
      case 12:
        return (
          <div className="form-group">
            <label>10. What would improve the tools you use?</label>
            <textarea
              name="toolImprovementSuggestions"
              value={formData.toolImprovementSuggestions}
              onChange={handleChange}
              rows={3}
            />
            {errors.toolImprovementSuggestions && (
              <span className="error">{errors.toolImprovementSuggestions}</span>
            )}
          </div>
        );
      case 13:
        return (
          <div className="form-group">
            <label>11. What features do you want in a digital health system? (Select up to 3)</label>
            {['Easier referral', 'Trial notifications', 'Access records', 'Track progress', 'Reminders', 'Chat with patients', 'Data sharing', 'Other'].map((option, i) => (
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
            {errors.desiredFeatures && (
              <span className="error">{errors.desiredFeatures}</span>
            )}
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
            <h1>Clinicians</h1>
            <h2>(Specialists, Doctors, Research Nurses, Principal Investigators)</h2>
            <p>As a Clinician, your insights are invaluable. We are developing an innovative online system to improve the connection between specialist care and clinical trial opportunities in Nigeria.</p>
            <p>Your feedback on current workflows, technology use, and unmet needs will directly inform the design of features tailored to Nigeria's healthcare context.</p>
          </div>

          <div className="progress-tracker">
            <p>Question {currentStep} of {totalSteps}</p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
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

          <div className="form-footer">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack}>Back</button>
            )}
            {/* {currentStep < totalSteps ? (
              <button type="button" onClick={handleNext}>Next</button>
            ) : (
              <button type="submit">Submit</button>
            )} */}

                       {currentStep === 13 && (
              <button type="submit">Submit</button>
            )}

             {currentStep < 13 && (
    <button type="button" onClick={handleNext}>Next</button>
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

export default ClinicianForm;