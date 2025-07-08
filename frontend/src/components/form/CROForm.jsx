// CRO Survey Form - Clinical Research Organizations / Trial Sponsors

import { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css';
import axios from 'axios';

const CROForm = () => {
  const [formData, setFormData] = useState({
    primaryRole: '',
    primaryRoleOther: '',
    orgType: '',
    experienceYears: '',
    regions: [],
    trialPhases: [],
    siteSelectionMethods: [],
    siteActivationChallenge: '',
    challenges: [],
    patientRecruitmentChallenge: '',
    dataFlowBottleneck: '',
    useDigitalSystems: '',
    digitalSystems: [],
    systemEffectiveness: '',
    limitations: [],
    infrastructureReliability: '',
    hasPrivacyConcerns: '',
    privacyConcerns: '',
    digitalReadiness: '',
    desiredFeatures: [],
    aiToolUsefulness: '',
    investInNewPlatforms: '',
    digitalSystemsOther: '',
    priorities: [],
    trialPhasesOther: '',
    limitationsOther: '',
    siteSelectionMethodsOther: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [submissionError, setSubmissionError] = useState('');
  const [errors, setErrors] = useState({});

  const totalSteps = 23;

  const requiredFields = {
    1: 'primaryRole',
    2: 'orgType',
    4: 'regions',
    5: 'trialPhases',
    6: 'siteSelectionMethods',
    8: 'challenges',
    11: 'useDigitalSystems',
    14: 'limitations',
    17: 'privacyConcerns',
    21: 'investInNewPlatforms'
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
    } else if (type === 'radio') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
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
    } else if (currentStep === 17 && formData.hasPrivacyConcerns === 'Yes' && !formData.privacyConcerns) {
      newErrors.privacyConcerns = true; // Just set to true to trigger error state
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 11 && formData.useDigitalSystems === 'No') {
      setCurrentStep(13);
      return;
    }
    if (currentStep === 16 && formData.useDigitalSystems === 'No' || formData.useDigitalSystems === 'Not sure') {
      setCurrentStep(18);
      return;
    }

    if (!validateCurrentStep()) {
      return;
    }

    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    // Handle special back navigation when we've skipped questions
    if (currentStep === 13 && formData.useDigitalSystems === 'No') {
      setCurrentStep(11);
    }
    if (currentStep === 18 && formData.useDigitalSystems === 'No' || formData.useDigitalSystems === 'Not sure') {
      setCurrentStep(16);
      return;
    }
    else {
      setCurrentStep(prev => Math.max(prev - 1, 1));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      // console.log('Submitted:', formData);
      setShowModal(true);
      setSubmissionError('');
      // Uncomment below to use API
      const API = import.meta.env.VITE_API_BASE_URL;
      axios.post(`${API}/cro`, formData)
        .then(() => {
          setShowModal(true);
          setSubmissionError('');
        })
        .catch(err => {
          console.error('Submission error', err);
          setSubmissionError('Something went wrong. Please try again.');
        });
    }
  };

  const renderQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-group">
            <label>1. What is your primary role within your organization? </label>
            {['Project Manager / Clinical Study Manager', 'Clinical Operations Lead / Manager', 'Regulatory Affairs Specialist', 'Data Manager / Biostatistician', 'Site Selection / Feasibility Manager', 'Medical Director / Scientific Affairs', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="primaryRole"
                  value={option}
                  checked={formData.primaryRole === option}
                  onChange={handleChange}
                />
                <span className="radio-text">{option}</span>
              </div>
            ))}
            {formData.primaryRole === 'Other' && (
              <input
                type="text"
                name="primaryRoleOther"
                placeholder="Please specify"
                value={formData.primaryRoleOther || ''}
                onChange={handleChange}
              />
            )}
          </div>
        );
      case 2:
        return (
          <div className="form-group">
            <label>2. What type of organization do you primarily represent?</label>
            {['Pharmaceutical / Biotechnology Company (Sponsor)', 'Contract Research Organization (CRO)', 'Academic / Research Institute', 'Government / Non-Governmental Organization (NGO) involved in clinical research', 'Other'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="orgType"
                  value={option}
                  checked={formData.orgType === option}
                  onChange={handleChange}
                />
                <span className="radio-text">{option}</span>
              </div>
            ))}
            {formData.orgType === 'Other' && (
              <input
                type="text"
                name="orgTypeOther"
                placeholder="Please specify"
                value={formData.orgTypeOther || ''}
                onChange={handleChange}
              />
            )}
            {errors.orgType && <span className="error">{errors.orgType}</span>}
          </div>
        );
      case 3:
        return (
          <div className="form-group">
            <label>3. How many years of experience do you have working in clinical trials?</label>
            {['Less than 2 years', '2 - 5 years', '6 - 10 years', 'More than 10 years'].map((years, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="experienceYears"
                  value={years}
                  checked={formData.experienceYears === years}
                  onChange={handleChange}
                />
                <span className="radio-text">{years}</span>
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="form-group">
            <label>4. In which regions of Africa does your organization primarily conduct clinical trials? (Select all that apply)</label>
            {['West Africa (e.g., Nigeria, Ghana)', 'East Africa (e.g., Kenya, Ethiopia)', 'Southern Africa (e.g., South Africa, Zambia)', 'North Africa (e.g., Egypt, Morocco)', 'Central Africa', 'Globally, including Africa', 'Only in Nigeria'].map((region, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="regions"
                  value={region}
                  checked={formData.regions.includes(region)}
                  onChange={handleChange}
                />
                <span className="radio-text">{region}</span>
              </div>
            ))}
            {errors.regions && <span className="error">{errors.regions}</span>}
          </div>
        );
      case 5:
        return (
          <div className="form-group">
            <label>5. What trial phases does your organization typically manage or sponsor in Africa/Nigeria? (Select all that apply) </label>
            {['Phase I', 'Phase II', 'Phase III', 'Phase IV (Post-marketing)', 'Observational Studies', 'Other'].map((phase, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="trialPhases"
                  value={phase}
                  checked={formData.trialPhases.includes(phase)}
                  onChange={handleChange}
                />
                <span className="radio-text">{phase}</span>
              </div>
            ))}
            {formData.trialPhases.includes('Other') && (
              <input
                type="text"
                name="trialPhasesOther"
                placeholder="Please specify"
                value={formData.trialPhasesOther || ''}
                onChange={handleChange}
              />
            )}
            {errors.trialPhases && <span className="error">{errors.trialPhases}</span>}
          </div>
        );
      case 6:
        return (
          <div className="form-group">
            <label>6. How do you currently identify and select suitable clinical trial sites in Nigeria/Africa? (Select all that apply) </label>
            {['Referrals from existing contacts or investigators', 'Internal site databases or historical data', 'Partnering with local CROs or consultants', 'Direct outreach to hospitals or research institutions', 'Review of publications or public registries', 'Community engagement or outreach activities', 'Other'].map((method, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="siteSelectionMethods"
                  value={method}
                  checked={formData.siteSelectionMethods.includes(method)}
                  onChange={handleChange}
                />
                <span className="radio-text">{method}</span>
              </div>
            ))}
            {formData.siteSelectionMethods.includes('Other') && (
              <input
                type="text"
                name="siteSelectionMethodsOther"
                placeholder="Please specify"
                value={formData.siteSelectionMethodsOther || ''}
                onChange={handleChange}
              />
            )}
            {errors.siteSelectionMethods && <span className="error">{errors.siteSelectionMethods}</span>}
          </div>
        );
      case 7:
        return (
          <div className="form-group">
            <label>7. How challenging is the process of identifying and activating suitable clinical trial sites in Nigeria/Africa?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="siteActivationChallenge"
                    value={num}
                    checked={formData.siteActivationChallenge == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Not Challenging at All </span>
                <span>5=Extremely Challenging</span>
              </div>
            </div>
          </div>
        );
      case 8:
        return (
          <div className="form-group">
            <label>8. What are the biggest challenges you face when managing ongoing clinical trial operations or communication with sites in Nigeria/Africa? (Select up to 3) </label>
            {[
              'Delays or incompleteness in data submission from sites',
              'Inconsistent data quality or accuracy from sites',
              'Difficulty communicating effectively and receiving timely updates from sites',
              'High patient dropout or loss to follow-up rates',
              'Challenges in monitoring site compliance with trial protocols (on-site or remote)',
              'Regulatory or ethical approval delays (e.g., EC/IRB approvals, import permits)',
              'Logistical hurdles (e.g., sample transport, drug supply chain)',
              'Managing trial budget and payments to sites',
              'Lack of qualified or adequately trained site staff',
              'Other'
            ].map((challenge, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="challenges"
                  value={challenge}
                  checked={formData.challenges.includes(challenge)}
                  disabled={formData.challenges.length >= 3 && !formData.challenges.includes(challenge)}
                  onChange={handleChange}
                />
                <span className="radio-text">{challenge}</span>
              </div>
            ))}
            {formData.challenges.includes('Other') && (
              <input
                type="text"
                name="challengesOther"
                placeholder="Please specify"
                value={formData.challengesOther || ''}
                onChange={handleChange}
              />
            )}
            {errors.challenges && <span className="error">{errors.challenges}</span>}
          </div>
        );
      case 9:
        return (
          <div className="form-group">
            <label>9. How challenging is patient recruitment and enrolment for your trials in Nigeria/Africa?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="patientRecruitmentChallenge"
                    value={num}
                    checked={formData.patientRecruitmentChallenge == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Not Challenging at All </span>
                <span>5=Extremely Challenging</span>
              </div>
            </div>
          </div>
        );
      case 10:
        return (
          <div className="form-group">
            <label>10. Please briefly describe a specific data flow bottleneck or communication gap you've encountered that is unique to (or particularly pronounced in) clinical trials conducted in Africa/Nigeria.</label>
            <textarea
              name="dataFlowBottleneck"
              value={formData.dataFlowBottleneck || ''}
              onChange={handleChange}
              rows={4}
            />
          </div>
        );
      case 11:
        return (
          <div className="form-group">
            <label>11. Do you currently use any digital systems or platforms for managing your clinical trial operations (e.g., EDC, CTMS, mobile data capture, eTMF)?</label>
            {['Yes', 'No'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="useDigitalSystems"
                  value={option}
                  checked={formData.useDigitalSystems === option}
                  onChange={handleChange}
                />
                <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.useDigitalSystems && <span className="error">{errors.useDigitalSystems}</span>}
          </div>
        );
      case 12:
        if (formData.useDigitalSystems !== 'Yes') return null;
        return (
          <div className="form-group">
            <label>11a. Which types of digital systems do you primarily use for trial management? (Select all that apply)</label>
            {[
              'Commercial Clinical Trial Management Systems (CTMS)',
              'Electronic Data Capture (EDC) systems',
              'Electronic Trial Master File (eTMF) systems',
              'Custom-built or local applications/databases',
              'Spreadsheets (e.g., Excel, Google Sheets) for data management',
              'General messaging apps (e.g., WhatsApp, Email) for site coordination',
              'Mobile data capture apps (for field use)',
              'Electronic Consent (eConsent) platforms',
              'Other'
            ].map((system, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="digitalSystems"
                  value={system}
                  checked={formData.digitalSystems.includes(system)}
                  onChange={handleChange}
                />
                <span className="radio-text">{system}</span>
              </div>
            ))}
            {formData.digitalSystems.includes('Other') && (
              <input
                type="text"
                name="digitalSystemsOther"
                placeholder="Please specify"
                value={formData.digitalSystemsOther || ''}
                onChange={handleChange}
              />
            )}
          </div>
        );
      case 13:
        //  if (formData.useDigitalSystems === 'NO') return null;
        return (
          <div className="form-group">
            <label>12. Overall, how well do your current digital systems meet your operational needs for managing clinical trials in Nigeria/Africa?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="systemEffectiveness"
                    value={num}
                    checked={formData.systemEffectiveness == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Not at All </span>
                <span>5=Completely</span>
              </div>
            </div>
          </div>
        );
      case 14:
        return (
          <div className="form-group">
            <label>13. What are the main limitations or issues you encounter with your existing digital tools (or reasons you don't use them)? (Select all that apply)</label>
            {[
              'Requires constant internet connectivity (no offline mode)',
              'Limited or no support for local languages/cultural context',
              'High cost of licensing or implementation',
              'Lack of mobile/tablet compatibility for site staff',
              'Concerns about data security or compliance with local regulations',
              'Difficulty integrating with other systems (e.g., local EMRs)',
              'Insufficient training or technical support for users at sites',
              'Poor user-friendliness/intuitive design',
              'Not designed for the unique challenges of African sites',
              'Other'
            ].map((limitation, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="limitations"
                  value={limitation}
                  checked={formData.limitations.includes(limitation)}
                  onChange={handleChange}
                />
                <span className="radio-text">{limitation}</span>
              </div>
            ))}
            {formData.limitations.includes('Other') && (
              <input
                type="text"
                name="limitationsOther"
                placeholder="Please specify"
                value={formData.limitationsOther || ''}
                onChange={handleChange}
              />
            )}
            {errors.limitations && <span className="error">{errors.limitations}</span>}
          </div>
        );
      case 15:
        return (
          <div className="form-group">
            <label>14. How reliable are internet and power at the clinical trial sites you work with in Nigeria/Africa?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="infrastructureReliability"
                    value={num}
                    checked={formData.infrastructureReliability == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Very Unreliable </span>
                <span>5=Very Reliable</span>
              </div>
            </div>
          </div>
        );
      case 16:
        return (
          <div className="form-group">
            <label>15. Have staff or participants at your trial sites expressed significant concerns about data privacy or trust when using digital tools for clinical trial activities? </label>
            {['Yes', 'No', 'Not sure'].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="hasPrivacyConcerns"
                  value={option}
                  checked={formData.hasPrivacyConcerns === option}
                  onChange={handleChange}
                />
                <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.hasPrivacyConcerns && <span className="error">{errors.hasPrivacyConcerns}</span>}
          </div>
        );
      case 17:
        if (formData.hasPrivacyConcerns !== 'Yes') return null;
        return (
          <div className="form-group">
            <label>15a. Please briefly describe the nature of those concerns:</label>
            <textarea
              name="privacyConcerns"
              value={formData.privacyConcerns || ''}
              onChange={handleChange}
              rows={4}
            />
            {errors.privacyConcerns && (
              <span className="error">{errors.privacyConcerns}</span>
            )}
          </div>
        );
      case 18:
        return (
          <div className="form-group">
            <label>16. What are your general perceptions of the current IT infrastructure and digital readiness of healthcare facilities and professionals at clinical trial sites in Nigeria/Africa?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="digitalReadiness"
                    value={num}
                    checked={formData.digitalReadiness == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Very Poor Readiness </span>
                <span>5=Very Good Readiness</span>
              </div>
            </div>
          </div>
        );
      case 19:
        return (
          <div className="form-group">
            <label>17. Which of the following new IT features or functionalities would most significantly improve your ability to conduct or manage clinical trials in Nigeria/Africa? (Select up to 3 most impactful features)</label>
            {[
              'Real-time Enrollment/Tracking Dashboard',
              'AI-driven Site/Patient Matching',
              'Offline-Capable Mobile Data Entry',
              'Secure Centralized Communication Platform',
              'Automated Regulatory Report Generation',
              'Electronic Consent (eConsent) Capabilities',
              'Support for Local Languages',
              'Telemedicine/Virtual Monitoring Tools',
              'Centralized Investigator/Site Database',
              'Other'
            ].map((feature, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  name="desiredFeatures"
                  value={feature}
                  checked={formData.desiredFeatures.includes(feature)}
                  disabled={formData.desiredFeatures.length >= 3 && !formData.desiredFeatures.includes(feature)}
                  onChange={handleChange}
                />
                <span className="radio-text">{feature}</span>
              </div>
            ))}
            {formData.desiredFeatures.includes('Other') && (
              <input
                type="text"
                name="desiredFeaturesOther"
                placeholder="Please specify"
                value={formData.desiredFeaturesOther || ''}
                onChange={handleChange}
              />
            )}
          </div>
        );
      case 20:
        return (
          <div className="form-group">
            <label>18. How useful would an AI tool be to help match local patient data to study eligibility criteria (assuming robust data privacy and ethical considerations are in place)?</label>
            <div className="rating-scale">
              {[1, 2, 3, 4, 5].map((num) => (
                <label key={num}>
                  <input
                    type="radio"
                    name="aiToolUsefulness"
                    value={num}
                    checked={formData.aiToolUsefulness == num}
                    onChange={handleChange}
                  />
                  <span className="radio-text">{num}</span>
                </label>
              ))}
              <div className="scale-labels">
                <span>1=Not Useful at All </span>
                <span>5=Very Useful</span>
              </div>
            </div>
            <input
              type="text"
              name="aiToolConcerns"
              placeholder=""
              value={formData.aiToolConcerns || ''}
              onChange={handleChange}
            />
          </div>
        );
      case 21:
        return (
          <div className="form-group">
            <label>19. Are you open to investing in and integrating with new digital platforms developed specifically for the unique context and challenges of clinical research in Africa? *</label>
            {[
              'Yes, definitely',
              'Yes, if it demonstrates clear ROI and addresses key challenges',
              'Maybe, but with significant reservations',
              'No, not at this time'
            ].map((option, i) => (
              <div key={i}>
                <input
                  type="radio"
                  name="investInNewPlatforms"
                  value={option}
                  checked={formData.investInNewPlatforms === option}
                  onChange={handleChange}
                />
                <span className="radio-text">{option}</span>
              </div>
            ))}
            {errors.investInNewPlatforms && <span className="error">{errors.investInNewPlatforms}</span>}
          </div>
        );
      case 22:
        const handlePriorityClick = (index) => {
          let newPriorities = [...formData.priorities];

          // Check if already selected
          if (newPriorities[index] !== undefined) {
            // Remove it
            newPriorities = newPriorities.map(val => val === newPriorities[index] ? undefined : val);
          } else {
            // Assign next available rank
            const usedRanks = newPriorities.filter(val => val !== undefined);
            const nextRank = usedRanks.length + 1;

            if (nextRank <= 4) {
              newPriorities[index] = nextRank;
            }
          }

          setFormData(prev => ({ ...prev, priorities: newPriorities }));
        };
        return (
          <div className="form-group">
            <label>20. Please rank the following areas of improvement by clicking on them in order of importance:</label>
            {[
              'Faster patient recruitment and higher retention rates',
              'Improved real-time communication and data flow with trial sites',
              'Streamlined regulatory and ethical approval processes',
              'Enhanced data quality and integrity from sites'
            ].map((area, i) => (
              <div key={i} className="ranking-item" style={{ marginBottom: '1rem', cursor: 'pointer' }} onClick={() => handlePriorityClick(i)}>
                <input
                  type="radio"
                  name={`priority-${i}`}
                  readOnly
                  checked={formData.priorities[i] !== undefined}
                />
                <span style={{ marginLeft: '0.5rem' }}>{area}</span>
                {formData.priorities[i] && (
                  <span style={{ marginLeft: '1rem', fontWeight: 'bold', color: 'green' }}>
                    Rank {formData.priorities[i]}
                  </span>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return <p>Survey completed!</p>;
    }
  };

  return (
    <div className='survey-body'>
      <Link to='/forms' className="arrow-link">← Back to Forms</Link>
      <div className="survey-container">
        <form onSubmit={handleSubmit} className="survey-form">
          <div className="survey-header">
            <h1>Clinical Research Organizations (CROs)/Trial Sponsors</h1>
            <p>Your expertise as a clinical trial manager or sponsor operating in Nigeria is critical. We are developing an innovative IT system to streamline clinical trial operations, enhance patient engagement, and improve connectivity within the Nigerian healthcare and research ecosystem. </p>
            <p>Your valuable insights will directly inform the features and functionality of this system. Your answers will be kept confidential. </p>
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

          <div className="form-footer">
            {currentStep > 1 && (
              <button type="button" onClick={handleBack}>Back</button>
            )}

               {currentStep === 22 && (
              <button type="submit">Submit</button>
            )}

             {currentStep < 22 && (
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

export default CROForm;