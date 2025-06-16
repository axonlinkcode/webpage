import React from 'react'

 const CROForm = () => (
  <form className="form">
    <h2>CRO / Sponsor Survey</h2>

    <label>Your role:</label>
    <select>
      <option>Project Manager</option>
      <option>Clinical Ops Lead</option>
      <option>Data Manager</option>
      <option>Medical Director</option>
      <option>Other</option>
    </select>

    <label>Organization Type:</label>
    <select>
      <option>Pharma/Biotech</option>
      <option>CRO</option>
      <option>Academic</option>
      <option>Govt/NGO</option>
      <option>Other</option>
    </select>

    <label>Years of Experience:</label>
    <select>
      <option>&lt; 2</option>
      <option>2 - 5</option>
      <option>6 - 10</option>
      <option>&gt; 10</option>
    </select>

    <label>Trial Phases Managed:</label>
    <input type="checkbox" /> Phase I<br />
    <input type="checkbox" /> Phase II<br />
    <input type="checkbox" /> Phase III<br />
    <input type="checkbox" /> Phase IV<br />
    <input type="checkbox" /> Observational<br />

    <label>Challenges with Sites:</label>
    <textarea rows="4" placeholder="Describe issues you've faced..." />

    <button type="submit">Submit</button>
  </form>
);

export default CROForm
