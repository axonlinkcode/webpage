import { useState } from 'react';
import { Link } from 'react-router-dom'
import './form.css';

const PatientForm = () => {
  const [formData, setFormData] = useState({
    // Part 1
    deviceType: '',
    location: '',
    infoSources: [],
    trialParticipation: '',
    accessDifficulty: 0,
    biggestChallenge: '',

    // Part 2
    usesInternetHealth: '',
    onlineActivities: [],
    noInternetReasons: [],
    comfortLevel: 0,
    internetReliability: 0,
    communicationPreferences: [],

    // Part 3
    desiredFeatures: [],
    privacyConcerns: '',
    smsWillingness: '',
    systemPriorities: []
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
    axios.post(`${API}/patient`, formData)
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="survey-container">
      <Link to='/forms' className="back-link">← Back to Forms</Link>
      <form onSubmit={handleSubmit} className="survey-form">
        <div className="survey-header">
          <h1>Patient Experience Survey</h1>
          <p className="intro-text">
            Your experience and insights are crucial! We are developing a new mobile-friendly system to help patients in Nigeria more easily find specialist care and discover relevant clinical trials. Your responses will directly inform how we build this system to meet your needs.
          </p>
          <p className="confidential-text">All your answers will be kept confidential.</p>
        </div>

        {/* Part 1: Your Background & Access to Care */}
        <section className="survey-section">
          <h2>Part 1: Your Background & Access to Care</h2>

          <div className="form-group">
            <label>
              1. Which of the following best describes the mobile device you mainly use?
            </label>
            <div className="radio-group">
              {['Basic phone (primarily for calls/SMS)', 'Smartphone with internet access', 'Computer/tablet with internet access (no smartphone)', 'I do not regularly use a mobile phone or internet-connected device.'].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="deviceType"
                    id={`deviceType${i}`}
                    value={option}
                    checked={formData.deviceType === option}
                    onChange={() => handleRadioChange('deviceType', option)}
                  />
                  <label htmlFor={`deviceType${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              2. Which of the following best describes where you live?
            </label>
            <div className="radio-group">
              {['Large city/urban area', 'Town or suburb', 'Rural area'].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="location"
                    id={`location${i}`}
                    value={option}
                    checked={formData.location === option}
                    onChange={() => handleRadioChange('location', option)}
                  />
                  <label htmlFor={`location${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              3. How do you typically find information about specialist doctors or clinical trials? (Select all that apply)
            </label>
            {[
              'Referral from a doctor, nurse, or other healthcare professional',
              'Internet search (e.g., Google) or hospital/clinic websites',
              'Social media platforms (e.g., Facebook, Instagram, WhatsApp groups)',
              'Radio, TV, or community announcements (e.g., church, mosque, town hall)',
              'Family, friends, or community leaders',
              'Direct outreach from a research organization',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`infoSources${i}`}
                  name="infoSources"
                  value={option}
                  checked={formData.infoSources.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`infoSources${i}`}>{option}</label>
                {option === 'Other' && formData.infoSources.includes('Other') && (
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
              4. Have you ever participated in a clinical trial or considered joining one?
            </label>
            <div className="radio-group">
              {[
                'Yes, I have participated in a clinical trial.',
                'Yes, I have considered joining a clinical trial.',
                'No, I have not participated in or considered joining a clinical trial.'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="trialParticipation"
                    id={`trialParticipation${i}`}
                    value={option}
                    checked={formData.trialParticipation === option}
                    onChange={() => handleRadioChange('trialParticipation', option)}
                  />
                  <label htmlFor={`trialParticipation${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              5. Based on your experience, how difficult is it for you to access specialist medical care when needed?
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
                      name="accessDifficulty"
                      id={`accessDifficulty${num}`}
                      value={num}
                      checked={formData.accessDifficulty === num}
                      onChange={() => handleRadioChange('accessDifficulty', num)}
                    />
                    <label htmlFor={`accessDifficulty${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              6. What is the single biggest challenge you currently face when trying to get specialist medical care or considering joining a clinical trial?
            </label>
            <textarea
              name="biggestChallenge"
              value={formData.biggestChallenge}
              onChange={handleChange}
              placeholder="Please describe in your own words"
              rows={4}
            />
          </div>
        </section>

        {/* Part 2: Your Experience with Digital Health & Communication */}
        <section className="survey-section">
          <h2>Part 2: Your Experience with Digital Health & Communication</h2>

          <div className="form-group">
            <label>
              7. Do you use the internet on your phone or computer for any health-related activities?
            </label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesInternetHealth"
                  id="usesInternetHealthYes"
                  value="Yes"
                  checked={formData.usesInternetHealth === 'Yes'}
                  onChange={() => handleRadioChange('usesInternetHealth', 'Yes')}
                />
                <label htmlFor="usesInternetHealthYes">Yes</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesInternetHealth"
                  id="usesInternetHealthNo"
                  value="No"
                  checked={formData.usesInternetHealth === 'No'}
                  onChange={() => handleRadioChange('usesInternetHealth', 'No')}
                />
                <label htmlFor="usesInternetHealthNo">No</label>
              </div>
            </div>
          </div>

          {formData.usesInternetHealth === 'Yes' && (
            <div className="form-group">
              <label>
                8. Which of these online health activities have you used? (Select all that apply)
              </label>
              {[
                'Accessing a hospital/clinic\'s official website or app',
                'Using a general health/medical mobile app',
                'Participating in health-related WhatsApp or Facebook groups',
                'Receiving SMS alerts or reminders from a clinic/hospital',
                'Searching for information about specific health conditions or treatments',
                'Booking appointments online',
                'Viewing lab results or medical records online',
                'Communicating with a doctor or clinic staff online',
                'Other'
              ].map((option, i) => (
                <div key={i} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`onlineActivities${i}`}
                    name="onlineActivities"
                    value={option}
                    checked={formData.onlineActivities.includes(option)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`onlineActivities${i}`}>{option}</label>
                  {option === 'Other' && formData.onlineActivities.includes('Other') && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      className="other-specify"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {formData.usesInternetHealth === 'No' && (
            <div className="form-group">
              <label>
                9. What are the main reasons you DO NOT use online services for health-related activities? (Select all that apply)
              </label>
              {[
                'Cost of mobile data or internet access is too high',
                'Poor internet or network coverage in my area',
                'I find it difficult to use technology (lack of digital literacy)',
                'I prefer to interact with healthcare providers in person or by phone',
                'I am not aware of such services',
                'Concerns about the privacy or security of my health information online',
                'Language or literacy challenges with online content',
                'Not interested in using online health services',
                'Other'
              ].map((option, i) => (
                <div key={i} className="checkbox-option">
                  <input
                    type="checkbox"
                    id={`noInternetReasons${i}`}
                    name="noInternetReasons"
                    value={option}
                    checked={formData.noInternetReasons.includes(option)}
                    onChange={handleChange}
                  />
                  <label htmlFor={`noInternetReasons${i}`}>{option}</label>
                  {option === 'Other' && formData.noInternetReasons.includes('Other') && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      className="other-specify"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="form-group">
            <label>
              10. Overall, how comfortable are you with using a mobile app or online service for your healthcare needs?
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
                      name="comfortLevel"
                      id={`comfortLevel${num}`}
                      value={num}
                      checked={formData.comfortLevel === num}
                      onChange={() => handleRadioChange('comfortLevel', num)}
                    />
                    <label htmlFor={`comfortLevel${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              11. How reliable is internet access at your home or in your local area?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Very Unreliable</span>
                <span>5 = Very Reliable</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="internetReliability"
                      id={`internetReliability${num}`}
                      value={num}
                      checked={formData.internetReliability === num}
                      onChange={() => handleRadioChange('internetReliability', num)}
                    />
                    <label htmlFor={`internetReliability${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              12. How do you prefer to communicate with your doctor or clinical trial staff for non-urgent matters? (Rank your top 3 choices)
            </label>
            <div className="ranking-instructions">
              <p>Drag to reorder or click to select your top 3 choices:</p>
            </div>
            <div className="ranking-options">
              {[
                'In-person visits',
                'Phone calls',
                'SMS (text messages)',
                'WhatsApp messages',
                'Specific health app notifications/messaging',
                'Email',
                'Other'
              ].map((option, i) => (
                <div key={i} className="ranking-option">
                  <select
                    value={formData.communicationPreferences[i] || ''}
                    onChange={(e) => handleRankChange('communicationPreferences', e.target.value, i)}
                  >
                    <option value="">Not ranked</option>
                    {[
                      'In-person visits',
                      'Phone calls',
                      'SMS (text messages)',
                      'WhatsApp messages',
                      'Specific health app notifications/messaging',
                      'Email',
                      'Other'
                    ].map((opt, j) => (
                      <option
                        key={j}
                        value={opt}
                        disabled={formData.communicationPreferences.includes(opt) && !formData.communicationPreferences[i]}
                      >
                        {opt}
                      </option>
                    ))}
                  </select>
                  {option === 'Other' && formData.communicationPreferences.includes('Other') && (
                    <input
                      type="text"
                      placeholder="Please specify"
                      className="other-specify"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Part 3: Desired IT Solutions & Priorities */}
        <section className="survey-section">
          <h2>Part 3: Desired IT Solutions & Priorities</h2>

          <div className="form-group">
            <label>
              13. Which of the following digital features or tools would help you most with your specialist care or clinical trial journey? (Select up to 3 most helpful options)
            </label>
            {[
              'Easy-to-understand information about specialist doctors and clinics',
              'Clear and reliable information/alerts about relevant clinical trials',
              'The ability to easily book or reschedule specialist appointments online',
              'Automated appointment reminders (via SMS or app notification)',
              'A secure way to message your doctor or clinical trial staff directly',
              'A system to track the status of your referrals or appointments',
              'Secure access to your basic health records online',
              'Tools to help you understand complex medical information',
              'Support for transportation or logistics related to appointments/trials',
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
              14. What are your main concerns regarding privacy and security if your personal health information were managed on a new digital platform?
            </label>
            <textarea
              name="privacyConcerns"
              value={formData.privacyConcerns}
              onChange={handleChange}
              placeholder="Please describe in your own words"
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>
              15. If reliable internet access is a challenge for you, would you be willing to use SMS (text messages) for important health notifications, appointment reminders, or basic information updates?
            </label>
            <div className="radio-group">
              {['Yes', 'No', 'Maybe, depending on the type of information'].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="smsWillingness"
                    id={`smsWillingness${i}`}
                    value={option}
                    checked={formData.smsWillingness === option}
                    onChange={() => handleRadioChange('smsWillingness', option)}
                  />
                  <label htmlFor={`smsWillingness${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              Please rank the following aspects from 1 (Most Important) to 4 (Least Important) for a new digital health system:
            </label>
            <div className="ranking-options">
              {[
                'Easier and faster scheduling of specialist appointments',
                'Receiving clear and trustworthy information about treatment and clinical trial options',
                'Getting timely reminders for appointments or medications',
                'Ensuring secure and transparent handling of my personal health information'
              ].map((option, i) => (
                <div key={i} className="ranking-option">
                  <label>{option}</label>
                  <select
                    value={formData.systemPriorities[i] || ''}
                    onChange={(e) => handleRankChange('systemPriorities', e.target.value, i)}
                  >
                    <option value="">Not ranked</option>
                    {[1, 2, 3, 4].map(num => (
                      <option
                        key={num}
                        value={num}
                        disabled={formData.systemPriorities.includes(num.toString()) && formData.systemPriorities[i] !== num.toString()}
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

export default PatientForm;