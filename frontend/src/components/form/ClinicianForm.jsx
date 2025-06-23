import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css';

const ClinicianSurvey = () => {
  const [formData, setFormData] = useState({
    
    // Part 1
    professionalRole: '',
    specialty: '',
    yearsPracticing: '',
    facilityTypes: [],
    trialInvolvement: '',
    workDevices: [],

    // Part 2
    referralDifficulty: 0,
    careCoordinationChallenges: [],
    trialChallenges: [],
    communicationChallengeExample: '',

    // Part 3
    usesDigitalTools: '',
    currentTools: [],
    toolsSatisfaction: 0,
    toolLimitations: [],
    outageFrequency: 0,

    // Part 4
    comfortWithNewTech: 0,
    desiredFeatures: [],
    aiToolInterest: 0,
    aiToolConcerns: '',
    trainingPreferences: [],
    improvementPriorities: []
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const { checked } = e.target;
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRankChange = (name, value, index) => {
    setFormData(prev => {
      const newRanks = [...prev[name]];
      newRanks[index] = value;
      return {
        ...prev,
        [name]: newRanks
      };
    });
  };

  
  const handleSubmit = (e) => {
    const API = import.meta.env.VITE_API_BASE_URL;
    e.preventDefault();
    axios.post(`${API}/clinician`,formData)
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="survey-container">
     <Link to='/forms' className="back-link">← Back to Forms</Link>
      <form onSubmit={handleSubmit} className="survey-form">
        <div className="survey-header">
          <h1>Clinician Experience Survey</h1>
          <p className="intro-text">
            As a clinician, your insights are invaluable. We are developing an innovative online system to improve the connection between specialist care and clinical trial opportunities in Nigeria. Your feedback will directly inform the design of features tailored to Nigeria's healthcare context.
          </p>
          <p className="confidential-text">Your answers will be kept confidential.</p>
        </div>

        {/* Part 1: Your Professional Background & Current Practice */}
        <section className="survey-section">
          <h2>Part 1: Your Professional Background & Current Practice</h2>

          <div className="form-group">
            <label>
              1. What is your primary professional role?
            </label>
            <div className="radio-group">
              {[
                'Doctor/Physician (e.g., Consultant, Resident)',
                'Surgeon',
                'Nurse (e.g., Clinical Nurse, Research Nurse)',
                'Pharmacist',
                'Laboratory Scientist/Technician',
                'Clinical Research Coordinator/Manager',
                'Principal Investigator (PI)',
                'Other'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="professionalRole"
                    id={`professionalRole${i}`}
                    value={option}
                    checked={formData.professionalRole === option}
                    onChange={() => handleRadioChange('professionalRole', option)}
                  />
                  <label htmlFor={`professionalRole${i}`}>{option}</label>
                  {option === 'Other' && formData.professionalRole === 'Other' && (
                    <input
                      type="text"
                      name="professionalRoleOther"
                      placeholder="Please specify"
                      className="other-specify"
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              What is your primary clinical specialty (e.g., Oncology, Cardiology, Neurology, Pediatrics)?
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              placeholder="Enter your specialty"
            />
          </div>

          <div className="form-group">
            <label>
              2. How many years have you been practicing in your current field in Nigeria?
            </label>
            <div className="radio-group">
              {[
                'Less than 2 years',
                '2 - 5 years',
                '6 - 10 years',
                'More than 10 years'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="yearsPracticing"
                    id={`yearsPracticing${i}`}
                    value={option}
                    checked={formData.yearsPracticing === option}
                    onChange={() => handleRadioChange('yearsPracticing', option)}
                  />
                  <label htmlFor={`yearsPracticing${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              3. What type of facility do you primarily work in? (Select all that apply)
            </label>
            {[
              'Public Tertiary Hospital (e.g., Teaching Hospital, Federal Medical Centre)',
              'Public Secondary Hospital (e.g., General Hospital)',
              'Private Hospital/Clinic',
              'Specialized Medical Center',
              'Dedicated Research Institute/Center',
              'University/Academic Institution',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`facilityTypes${i}`}
                  name="facilityTypes"
                  value={option}
                  checked={formData.facilityTypes.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`facilityTypes${i}`}>{option}</label>
                {option === 'Other' && formData.facilityTypes.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              4. Are you currently involved in or have you previously participated in clinical trials?
            </label>
            <div className="radio-group">
              {[
                'Yes, currently involved.',
                'Yes, have participated previously.',
                'No, I have not been involved in clinical trials.',
                'No, but I am interested in becoming involved.'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="trialInvolvement"
                    id={`trialInvolvement${i}`}
                    value={option}
                    checked={formData.trialInvolvement === option}
                    onChange={() => handleRadioChange('trialInvolvement', option)}
                  />
                  <label htmlFor={`trialInvolvement${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              5. Which devices do you primarily use for your work-related tasks? (Select all that apply)
            </label>
            {[
              'Desktop PC/Laptop',
              'Smartphone with internet access',
              'Tablet with internet access',
              'Basic phone (for calls/SMS only)',
              'None of the above (primarily paper-based)'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`workDevices${i}`}
                  name="workDevices"
                  value={option}
                  checked={formData.workDevices.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`workDevices${i}`}>{option}</label>
              </div>
            ))}
          </div>
        </section>

        {/* Part 2: Challenges in Specialist Care Coordination & Clinical Trials */}
        <section className="survey-section">
          <h2>Part 2: Challenges in Specialist Care Coordination & Clinical Trials</h2>

          <div className="form-group">
            <label>
              6. How challenging is it for you to refer a patient to another specialist or department outside of your health facility or to receive patient referrals?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Very Easy</span>
                <span>5 = Very Difficult</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="referralDifficulty"
                      id={`referralDifficulty${num}`}
                      value={num}
                      checked={formData.referralDifficulty === num}
                      onChange={() => handleRadioChange('referralDifficulty', num)}
                    />
                    <label htmlFor={`referralDifficulty${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              7. What are your biggest challenges related to communication and information flow when coordinating patient care with other healthcare professionals in other facilities? (Select up to 3)
            </label>
            {[
              'Delays in receiving patient information or test results',
              'Difficulty in securely sharing patient records between departments/facilities',
              'Lack of a formal referral process or tracking system',
              'Unreliable phone or internet connectivity hindering communication',
              'Limited availability of contact information for other specialists',
              'Challenges in scheduling joint consultations or multidisciplinary meetings',
              'Ensuring patient consent for information sharing',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`careCoordinationChallenges${i}`}
                  name="careCoordinationChallenges"
                  value={option}
                  checked={formData.careCoordinationChallenges.includes(option)}
                  onChange={handleChange}
                  disabled={formData.careCoordinationChallenges.length >= 3 && !formData.careCoordinationChallenges.includes(option)}
                />
                <label htmlFor={`careCoordinationChallenges${i}`}>{option}</label>
                {option === 'Other' && formData.careCoordinationChallenges.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              8. If you are involved in clinical trials (or have been), what are the most significant operational challenges you face when conducting or preparing for a trial in your facility? (Select all that apply)
            </label>
            {[
              'Patient recruitment and enrollment',
              'Collecting accurate and timely trial data',
              'Maintaining regulatory compliance and ethical approvals',
              'Logistical support for trial conduct (e.g., drug supply, equipment)',
              'Communication and collaboration with Clinical Research Organizations (CROs)/Sponsors',
              'Managing patient records and consent forms for trials',
              'Budgeting and financial management of trials',
              'Lack of trained research staff',
              'Not Applicable (I am not involved in clinical trials)',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`trialChallenges${i}`}
                  name="trialChallenges"
                  value={option}
                  checked={formData.trialChallenges.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`trialChallenges${i}`}>{option}</label>
                {option === 'Other' && formData.trialChallenges.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              9. Please briefly describe a recent situation where a communication or workflow challenge negatively impacted patient care coordination or a clinical trial activity.
            </label>
            <textarea
              name="communicationChallengeExample"
              value={formData.communicationChallengeExample}
              onChange={handleChange}
              placeholder="Describe the situation and its impact"
              rows={4}
            />
          </div>
        </section>

        {/* Part 3: Current Digital Tools & Gaps */}
        <section className="survey-section">
          <h2>Part 3: Current Digital Tools & Gaps</h2>

          <div className="form-group">
            <label>
              10. Do you currently use any digital tools specifically for patient referrals, patient tracking, or clinical trial data management in your work?
            </label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesDigitalTools"
                  id="usesDigitalToolsYes"
                  value="Yes"
                  checked={formData.usesDigitalTools === 'Yes'}
                  onChange={() => handleRadioChange('usesDigitalTools', 'Yes')}
                />
                <label htmlFor="usesDigitalToolsYes">Yes</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesDigitalTools"
                  id="usesDigitalToolsNo"
                  value="No"
                  checked={formData.usesDigitalTools === 'No'}
                  onChange={() => handleRadioChange('usesDigitalTools', 'No')}
                />
                <label htmlFor="usesDigitalToolsNo">No</label>
              </div>
            </div>
          </div>

          {formData.usesDigitalTools === 'Yes' && (
            <>
              <div className="form-group">
                <label>
                  11. Which of the following do you use? (Select all that apply)
                </label>
                {[
                  'Electronic Medical Record (EMR) or hospital information system',
                  'Dedicated clinical trial management software (e.g., EDC system)',
                  'Spreadsheet software or simple databases (e.g., Microsoft Excel, Google Sheets)',
                  'General messaging apps (e.g., WhatsApp, Telegram) for professional communication',
                  'SMS for alerts or reminders',
                  'Telemedicine or virtual consultation platforms',
                  'Other'
                ].map((option, i) => (
                  <div key={i} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`currentTools${i}`}
                      name="currentTools"
                      value={option}
                      checked={formData.currentTools.includes(option)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`currentTools${i}`}>{option}</label>
                    {option === 'Other' && formData.currentTools.includes('Other') && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        className="other-specify"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="form-group">
                <label>
                  12. Overall, how well do your current digital tools meet your needs for coordinating specialist care and/or managing clinical trial activities?
                </label>
                <div className="scale-group">
                  <div className="scale-labels">
                    <span>1 = Not at all</span>
                    <span>5 = Completely</span>
                  </div>
                  <div className="scale-options">
                    {[1, 2, 3, 4, 5].map(num => (
                      <div key={num} className="scale-option">
                        <input
                          type="radio"
                          name="toolsSatisfaction"
                          id={`toolsSatisfaction${num}`}
                          value={num}
                          checked={formData.toolsSatisfaction === num}
                          onChange={() => handleRadioChange('toolsSatisfaction', num)}
                        />
                        <label htmlFor={`toolsSatisfaction${num}`}>{num}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              13. What are the main limitations or issues you experience with existing digital tools (or reasons you don't use them)? (Select all that apply)
            </label>
            {[
              'Frequent internet/network outages or poor connectivity',
              'Lack of reliable power supply for devices/servers',
              'High cost of mobile data or device acquisition',
              'Lack of sufficient training or technical support',
              'Tools are not user-friendly or intuitive',
              'Poor integration between different systems/tools',
              'Lack of offline mode (requires constant internet)',
              'Concerns about data privacy and security',
              'Not relevant to my workflow/needs',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`toolLimitations${i}`}
                  name="toolLimitations"
                  value={option}
                  checked={formData.toolLimitations.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`toolLimitations${i}`}>{option}</label>
                {option === 'Other' && formData.toolLimitations.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              14. How often do internet or power outages disrupt your clinical or research work?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Never</span>
                <span>5 = Very Often</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="outageFrequency"
                      id={`outageFrequency${num}`}
                      value={num}
                      checked={formData.outageFrequency === num}
                      onChange={() => handleRadioChange('outageFrequency', num)}
                    />
                    <label htmlFor={`outageFrequency${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Part 4: Desired IT Solutions & Priorities */}
        <section className="survey-section">
          <h2>Part 4: Desired IT Solutions & Priorities</h2>

          <div className="form-group">
            <label>
              15. How comfortable are you with using new mobile applications or online systems for your professional work?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Not Comfortable at All</span>
                <span>5 = Very Comfortable</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="comfortWithNewTech"
                      id={`comfortWithNewTech${num}`}
                      value={num}
                      checked={formData.comfortWithNewTech === num}
                      onChange={() => handleRadioChange('comfortWithNewTech', num)}
                    />
                    <label htmlFor={`comfortWithNewTech${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              16. Which of the following IT features would be most helpful to you in a new digital system designed for specialist care and clinical trials? (Select up to 3 most impactful features)
            </label>
            {[
              'Secure Referral Dashboard: A centralized platform to track patient referrals (sent & received) and their status in real-time.',
              'Automated Patient-Trial Matching: An AI-powered tool that suggests eligible patients for relevant clinical trials based on their medical profiles.',
              'Secure Patient Data Sharing: A standardized and secure way to share essential patient medical information between specialists and facilities.',
              'Mobile Notifications/Alerts: Real-time reminders for appointments, lab results, critical patient updates, or trial milestones.',
              'Offline/Low-Data Mode: Ability to enter data and perform basic tasks even with unreliable or no internet connectivity.',
              'Integrated Telemedicine/Virtual Consultation: Tools for secure video or audio consultations with patients or other specialists.',
              'Multilingual Support: Interface and content available in multiple local languages.',
              'Centralized Trial Information Hub: A platform to easily discover, access protocols for, and manage approved clinical trials.',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`desiredFeatures${i}`}
                  name="desiredFeatures"
                  value={option}
                  checked={formData.desiredFeatures.includes(option)}
                  onChange={handleChange}
                  disabled={formData.desiredFeatures.length >= 3 && !formData.desiredFeatures.includes(option)}
                />
                <label htmlFor={`desiredFeatures${i}`}>{option}</label>
                {option === 'Other' && formData.desiredFeatures.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              17. How interested are you in using an AI tool that can help identify and suggest eligible patients for clinical trials based on their medical data?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Not Interested at All</span>
                <span>5 = Very Interested</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="aiToolInterest"
                      id={`aiToolInterest${num}`}
                      value={num}
                      checked={formData.aiToolInterest === num}
                      onChange={() => handleRadioChange('aiToolInterest', num)}
                    />
                    <label htmlFor={`aiToolInterest${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
            {formData.aiToolInterest > 0 && formData.aiToolInterest < 5 && (
              <input
                type="text"
                name="aiToolConcerns"
                value={formData.aiToolConcerns}
                onChange={handleChange}
                placeholder="Any concerns about this AI tool?"
                className="other-specify"
              />
            )}
          </div>

          <div className="form-group">
            <label>
              18. What kind of training or ongoing support would be most beneficial for you to effectively use a new digital health platform? (Select all that apply)
            </label>
            {[
              'In-person training workshops',
              'Online video tutorials/webinars',
              'Printed user manuals/guides',
              'Dedicated technical support hotline/chat',
              'Peer-to-peer training/mentorship',
              'Regular refresher training',
              'Not applicable / I don\'t require training'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`trainingPreferences${i}`}
                  name="trainingPreferences"
                  value={option}
                  checked={formData.trainingPreferences.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`trainingPreferences${i}`}>{option}</label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              19. Please rank the following areas of improvement from 1 (Highest Priority) to 4 (Lowest Priority) for a new digital system:
            </label>
            <div className="ranking-options">
              {[
                'Faster and more secure communication of patient referrals and test results',
                'Better identification and tracking of patients potentially eligible for clinical trials',
                'Enhanced ability to work effectively even with poor internet/power (offline/low-data features)',
                'Streamlining administrative tasks related to patient care and trial documentation'
              ].map((option, i) => (
                <div key={i} className="ranking-option">
                  <label>{option}</label>
                  <select
                    value={formData.improvementPriorities[i] || ''}
                    onChange={(e) => handleRankChange('improvementPriorities', e.target.value, i)}
                  >
                    <option value="">Not ranked</option>
                    {[1, 2, 3, 4].map(num => (
                      <option
                        key={num}
                        value={num}
                        disabled={formData.improvementPriorities.includes(num.toString()) && formData.improvementPriorities[i] !== num.toString()}
                      >
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="form-footer">
          <button type="submit" className="submit-button">
            Submit Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicianSurvey;