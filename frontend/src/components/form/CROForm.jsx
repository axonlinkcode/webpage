import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './form.css'; // Using the same CSS file

const CROForm = () => {
  const [formData, setFormData] = useState({
    // Part 1
    primaryRole: '',
    organizationType: '',
    yearsExperience: '',
    trialRegions: [],
    trialPhases: [],

    // Part 2
    siteSelectionMethods: [],
    siteActivationChallenge: 0,
    operationalChallenges: [],
    recruitmentChallenge: 0,
    dataFlowBottleneck: '',

    // Part 3
    usesDigitalSystems: '',
    currentDigitalTools: [],
    systemSatisfaction: 0,
    systemLimitations: [],
    siteInfrastructureReliability: 0,
    privacyConcernsExpressed: '',
    privacyConcernsDetails: '',

    // Part 4
    itReadinessPerception: 0,
    desiredFeatures: [],
    aiToolUsefulness: 0,
    aiToolConcerns: '',
    investmentOpenness: '',
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
    axios.post(`${API}/cro`, formData)
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="survey-container">
     <Link to='/forms' className="back-link">← Back to Forms</Link>
      <form onSubmit={handleSubmit} className="survey-form">
        <div className="survey-header">
          <h1>CRO/Sponsor Experience Survey</h1>
          <p className="intro-text">
            Your expertise as a clinical trial manager or sponsor operating in Nigeria is critical. We are developing an innovative IT system to streamline clinical trial operations, enhance patient engagement, and improve connectivity within the Nigerian healthcare and research ecosystem.
          </p>
          <p className="confidential-text">Your answers will be kept confidential.</p>
        </div>

        {/* Part 1: Your Role & Organizational Context */}
        <section className="survey-section">
          <h2>Part 1: Your Role & Organizational Context</h2>

          <div className="form-group">
            <label>
              1. What is your primary role within your organization?
            </label>
            <div className="radio-group">
              {[
                'Project Manager / Clinical Study Manager',
                'Clinical Operations Lead / Manager',
                'Regulatory Affairs Specialist',
                'Data Manager / Biostatistician',
                'Site Selection / Feasibility Manager',
                'Medical Director / Scientific Affairs',
                'Other'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="primaryRole"
                    id={`primaryRole${i}`}
                    value={option}
                    checked={formData.primaryRole === option}
                    onChange={() => handleRadioChange('primaryRole', option)}
                  />
                  <label htmlFor={`primaryRole${i}`}>{option}</label>
                  {option === 'Other' && formData.primaryRole === 'Other' && (
                    <input
                      type="text"
                      name="primaryRoleOther"
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
              2. What type of organization do you primarily represent?
            </label>
            <div className="radio-group">
              {[
                'Pharmaceutical / Biotechnology Company (Sponsor)',
                'Contract Research Organization (CRO)',
                'Academic / Research Institute',
                'Government / Non-Governmental Organization (NGO) involved in clinical research',
                'Other'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="organizationType"
                    id={`organizationType${i}`}
                    value={option}
                    checked={formData.organizationType === option}
                    onChange={() => handleRadioChange('organizationType', option)}
                  />
                  <label htmlFor={`organizationType${i}`}>{option}</label>
                  {option === 'Other' && formData.organizationType === 'Other' && (
                    <input
                      type="text"
                      name="organizationTypeOther"
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
              3. How many years of experience do you have working in clinical trials?
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
                    name="yearsExperience"
                    id={`yearsExperience${i}`}
                    value={option}
                    checked={formData.yearsExperience === option}
                    onChange={() => handleRadioChange('yearsExperience', option)}
                  />
                  <label htmlFor={`yearsExperience${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              4. In which regions of Africa does your organization primarily conduct clinical trials? (Select all that apply)
            </label>
            {[
              'West Africa (e.g., Nigeria, Ghana)',
              'East Africa (e.g., Kenya, Ethiopia)',
              'Southern Africa (e.g., South Africa, Zambia)',
              'North Africa (e.g., Egypt, Morocco)',
              'Central Africa',
              'Globally, including Africa',
              'Only in Nigeria'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`trialRegions${i}`}
                  name="trialRegions"
                  value={option}
                  checked={formData.trialRegions.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`trialRegions${i}`}>{option}</label>
              </div>
            ))}
          </div>

          <div className="form-group">
            <label>
              5. What trial phases does your organization typically manage or sponsor in Africa/Nigeria? (Select all that apply)
            </label>
            {[
              'Phase I',
              'Phase II',
              'Phase III',
              'Phase IV (Post-marketing)',
              'Observational Studies',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`trialPhases${i}`}
                  name="trialPhases"
                  value={option}
                  checked={formData.trialPhases.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`trialPhases${i}`}>{option}</label>
                {option === 'Other' && formData.trialPhases.includes('Other') && (
                  <input
                    type="text"
                    placeholder="Please specify"
                    className="other-specify"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Part 2: Challenges in Clinical Trial Operations & Site Management */}
        <section className="survey-section">
          <h2>Part 2: Challenges in Clinical Trial Operations & Site Management</h2>

          <div className="form-group">
            <label>
              6. How do you currently identify and select suitable clinical trial sites in Nigeria/Africa? (Select all that apply)
            </label>
            {[
              'Referrals from existing contacts or investigators',
              'Internal site databases or historical data',
              'Partnering with local CROs or consultants',
              'Direct outreach to hospitals or research institutions',
              'Review of publications or public registries',
              'Community engagement or outreach activities',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`siteSelectionMethods${i}`}
                  name="siteSelectionMethods"
                  value={option}
                  checked={formData.siteSelectionMethods.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`siteSelectionMethods${i}`}>{option}</label>
                {option === 'Other' && formData.siteSelectionMethods.includes('Other') && (
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
              7. How challenging is the process of identifying and activating suitable clinical trial sites in Nigeria/Africa?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Not Challenging at All</span>
                <span>5 = Extremely Challenging</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="siteActivationChallenge"
                      id={`siteActivationChallenge${num}`}
                      value={num}
                      checked={formData.siteActivationChallenge === num}
                      onChange={() => handleRadioChange('siteActivationChallenge', num)}
                    />
                    <label htmlFor={`siteActivationChallenge${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              8. What are the biggest challenges you face when managing ongoing clinical trial operations or communication with sites in Nigeria/Africa? (Select up to 3)
            </label>
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
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`operationalChallenges${i}`}
                  name="operationalChallenges"
                  value={option}
                  checked={formData.operationalChallenges.includes(option)}
                  onChange={handleChange}
                  disabled={formData.operationalChallenges.length >= 3 && !formData.operationalChallenges.includes(option)}
                />
                <label htmlFor={`operationalChallenges${i}`}>{option}</label>
                {option === 'Other' && formData.operationalChallenges.includes('Other') && (
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
              9. How challenging is patient recruitment and enrolment for your trials in Nigeria/Africa?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Not Challenging at All</span>
                <span>5 = Extremely Challenging</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="recruitmentChallenge"
                      id={`recruitmentChallenge${num}`}
                      value={num}
                      checked={formData.recruitmentChallenge === num}
                      onChange={() => handleRadioChange('recruitmentChallenge', num)}
                    />
                    <label htmlFor={`recruitmentChallenge${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              10. Please briefly describe a specific data flow bottleneck or communication gap you've encountered that is unique to (or particularly pronounced in) clinical trials conducted in Africa/Nigeria.
            </label>
            <textarea
              name="dataFlowBottleneck"
              value={formData.dataFlowBottleneck}
              onChange={handleChange}
              placeholder="Describe the bottleneck or gap and its impact"
              rows={4}
            />
          </div>
        </section>

        {/* Part 3: Current Digital Tools & Limitations */}
        <section className="survey-section">
          <h2>Part 3: Current Digital Tools & Limitations</h2>

          <div className="form-group">
            <label>
              11. Do you currently use any digital systems or platforms for managing your clinical trial operations (e.g., EDC, CTMS, mobile data capture, eTMF)?
            </label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesDigitalSystems"
                  id="usesDigitalSystemsYes"
                  value="Yes"
                  checked={formData.usesDigitalSystems === 'Yes'}
                  onChange={() => handleRadioChange('usesDigitalSystems', 'Yes')}
                />
                <label htmlFor="usesDigitalSystemsYes">Yes</label>
              </div>
              <div className="radio-option">
                <input
                  type="radio"
                  name="usesDigitalSystems"
                  id="usesDigitalSystemsNo"
                  value="No"
                  checked={formData.usesDigitalSystems === 'No'}
                  onChange={() => handleRadioChange('usesDigitalSystems', 'No')}
                />
                <label htmlFor="usesDigitalSystemsNo">No</label>
              </div>
            </div>
          </div>

          {formData.usesDigitalSystems === 'Yes' && (
            <>
              <div className="form-group">
                <label>
                  12. Which types of digital systems do you primarily use for trial management? (Select all that apply)
                </label>
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
                ].map((option, i) => (
                  <div key={i} className="checkbox-option">
                    <input
                      type="checkbox"
                      id={`currentDigitalTools${i}`}
                      name="currentDigitalTools"
                      value={option}
                      checked={formData.currentDigitalTools.includes(option)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`currentDigitalTools${i}`}>{option}</label>
                    {option === 'Other' && formData.currentDigitalTools.includes('Other') && (
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
                  13. Overall, how well do your current digital systems meet your operational needs for managing clinical trials in Nigeria/Africa?
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
                          name="systemSatisfaction"
                          id={`systemSatisfaction${num}`}
                          value={num}
                          checked={formData.systemSatisfaction === num}
                          onChange={() => handleRadioChange('systemSatisfaction', num)}
                        />
                        <label htmlFor={`systemSatisfaction${num}`}>{num}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="form-group">
            <label>
              14. What are the main limitations or issues you encounter with your existing digital tools (or reasons you don't use them)? (Select all that apply)
            </label>
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
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`systemLimitations${i}`}
                  name="systemLimitations"
                  value={option}
                  checked={formData.systemLimitations.includes(option)}
                  onChange={handleChange}
                />
                <label htmlFor={`systemLimitations${i}`}>{option}</label>
                {option === 'Other' && formData.systemLimitations.includes('Other') && (
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
              15. How reliable are internet and power at the clinical trial sites you work with in Nigeria/Africa?
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
                      name="siteInfrastructureReliability"
                      id={`siteInfrastructureReliability${num}`}
                      value={num}
                      checked={formData.siteInfrastructureReliability === num}
                      onChange={() => handleRadioChange('siteInfrastructureReliability', num)}
                    />
                    <label htmlFor={`siteInfrastructureReliability${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              16. Have staff or participants at your trial sites expressed significant concerns about data privacy or trust when using digital tools for clinical trial activities?
            </label>
            <div className="radio-group">
              {['Yes', 'No', 'Not sure'].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="privacyConcernsExpressed"
                    id={`privacyConcernsExpressed${i}`}
                    value={option}
                    checked={formData.privacyConcernsExpressed === option}
                    onChange={() => handleRadioChange('privacyConcernsExpressed', option)}
                  />
                  <label htmlFor={`privacyConcernsExpressed${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          {formData.privacyConcernsExpressed === 'Yes' && (
            <div className="form-group">
              <label>
                17. If YES to Question 16, please briefly describe the nature of those concerns:
              </label>
              <textarea
                name="privacyConcernsDetails"
                value={formData.privacyConcernsDetails}
                onChange={handleChange}
                placeholder="Describe the concerns expressed"
                rows={4}
              />
            </div>
          )}
        </section>

        {/* Part 4: Desired IT Solutions & Priorities */}
        <section className="survey-section">
          <h2>Part 4: Desired IT Solutions & Priorities</h2>

          <div className="form-group">
            <label>
              18. What are your general perceptions of the current IT infrastructure and digital readiness of healthcare facilities and professionals at clinical trial sites in Nigeria/Africa?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Very Poor Readiness</span>
                <span>5 = Very Good Readiness</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="itReadinessPerception"
                      id={`itReadinessPerception${num}`}
                      value={num}
                      checked={formData.itReadinessPerception === num}
                      onChange={() => handleRadioChange('itReadinessPerception', num)}
                    />
                    <label htmlFor={`itReadinessPerception${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>
              19. Which of the following new IT features or functionalities would most significantly improve your ability to conduct or manage clinical trials in Nigeria/Africa? (Select up to 3 most impactful features)
            </label>
            {[
              'Real-time Enrollment/Tracking Dashboard: A centralized dashboard showing patient enrollment, progress, and key metrics across sites in real-time.',
              'AI-driven Site/Patient Matching: Tools that use AI to help identify optimal sites or match local patient data to study eligibility criteria.',
              'Offline-Capable Mobile Data Entry: Mobile applications that allow site staff to collect and enter data without constant internet, syncing later.',
              'Secure Centralized Communication Platform: A dedicated, secure channel for direct communication and document sharing with all trial sites.',
              'Automated Regulatory Report Generation: Tools that streamline the creation and submission of regulatory documents and reports.',
              'Electronic Consent (eConsent) Capabilities: Digital platforms for obtaining and managing informed consent from participants.',
              'Support for Local Languages: A system interface and content available in multiple local languages.',
              'Telemedicine/Virtual Monitoring Tools: Features to conduct remote site monitoring visits or patient follow-ups.',
              'Centralized Investigator/Site Database: A comprehensive, searchable database of qualified investigators and site capabilities.',
              'Other'
            ].map((option, i) => (
              <div key={i} className="checkbox-option">
                <input
                  type="checkbox"
                  id={`desiredFeatures${i}`}
                  className='checkbox-input'
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
              20. How useful would an AI tool be to help match local patient data to study eligibility criteria (assuming robust data privacy and ethical considerations are in place)?
            </label>
            <div className="scale-group">
              <div className="scale-labels">
                <span>1 = Not Useful at All</span>
                <span>5 = Very Useful</span>
              </div>
              <div className="scale-options">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className="scale-option">
                    <input
                      type="radio"
                      name="aiToolUsefulness"
                      id={`aiToolUsefulness${num}`}
                      value={num}
                      checked={formData.aiToolUsefulness === num}
                      onChange={() => handleRadioChange('aiToolUsefulness', num)}
                    />
                    <label htmlFor={`aiToolUsefulness${num}`}>{num}</label>
                  </div>
                ))}
              </div>
            </div>
            {(formData.aiToolUsefulness > 0 && formData.aiToolUsefulness < 5) && (
              <input
                type="text"
                name="aiToolConcerns"
                value={formData.aiToolConcerns}
                onChange={handleChange}
                placeholder="I have concerns about this (please specify)"
                className="other-specify"
              />
            )}
          </div>

          <div className="form-group">
            <label>
              21. Are you open to investing in and integrating with new digital platforms developed specifically for the unique context and challenges of clinical research in Africa?
            </label>
            <div className="radio-group">
              {[
                'Yes, definitely',
                'Yes, if it demonstrates clear ROI and addresses key challenges',
                'Maybe, but with significant reservations',
                'No, not at this time'
              ].map((option, i) => (
                <div key={i} className="radio-option">
                  <input
                    type="radio"
                    name="investmentOpenness"
                    id={`investmentOpenness${i}`}
                    value={option}
                    checked={formData.investmentOpenness === option}
                    onChange={() => handleRadioChange('investmentOpenness', option)}
                  />
                  <label htmlFor={`investmentOpenness${i}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>
              22. Please rank the following areas of improvement from 1 (Highest Priority) to 4 (Lowest Priority) for a new digital system:
            </label>
            <div className="ranking-options">
              {[
                'Faster patient recruitment and higher retention rates',
                'Improved real-time communication and data flow with trial sites',
                'Streamlined regulatory and ethical approval processes',
                'Enhanced data quality and integrity from sites'
              ].map((option, i) => (
                <div key={i} className="ranking-option">
                  <label>{option}</label>
                  <select
                    value={formData.improvementPriorities[i] || ''}
                    onChange={(e) => handleRankChange('improvementPriorities', e.target.value, i)}
                  >
                    <option value="" className='ranking-option-option'>Select rank</option>
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

export default CROForm;