import { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import axios from 'axios';

const ClinicianForm = () => {
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

  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  const totalSteps = 14;

  const requiredFields = {
    1: 'professionalRole',
    2: 'facilityTypes',
    3: 'trialInvolvement',
    4: 'workDevices',
    5: 'referralDifficulty',
    6: 'careCoordinationChallenges',
    7: 'trialChallenges',
    9: 'usesDigitalTools',
    12: 'toolImprovementSuggestions',
    15: 'desiredFeatures'
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
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const key = requiredFields[currentStep];
    const value = formData[key];

    if (currentStep === 8 && formData.usesDigitalTools === 'No') {
      // Skip 8a and 8b if they don't use digital tools
      setCurrentStep(11); // jump to step 11 (question 14)
      return;
    }

    if (key && (value === '' || (Array.isArray(value) && value.length === 0))) {
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
    console.log('Form submitted:', formData);
    // Simulate success
    setShowModal(true);
    setSubmissionError('');
    // Uncomment below to use API
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
            <h1>Clinician Experience Survey</h1>
            <p>Help us understand your challenges and improve digital tools for clinical work in Nigeria.</p>
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

          <div className="survey-questions">{renderQuestion()}</div>

          <div className="form-footer">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack}>Back</button>
            )}
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

export default ClinicianForm;
