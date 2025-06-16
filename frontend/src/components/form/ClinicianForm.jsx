import React from 'react'

const ClinicianForm = () => (
    <form className="form">
        <h2>Clinician Survey</h2>

        <label>Your role:</label>
        <select>
            <option>Doctor</option>
            <option>Surgeon</option>
            <option>Nurse</option>
            <option>Pharmacist</option>
            <option>Lab Scientist</option>
            <option>Clinical Research Coordinator</option>
            <option>PI</option>
            <option>Other</option>
        </select>

        <label>Specialty:</label>
        <input type="text" placeholder="e.g., Cardiology" />

        <label>Years of Experience:</label>
        <select>
            <option>&lt; 2</option>
            <option>2 - 5</option>
            <option>6 - 10</option>
            <option>&gt; 10</option>
        </select>

        <label>Workplace Type:</label>
        <input type="checkbox" /> Public Tertiary<br />
        <input type="checkbox" /> Public Secondary<br />
        <input type="checkbox" /> Private Clinic<br />
        <input type="checkbox" /> Specialized Center<br />
        <input type="checkbox" /> University/Institute<br />

        <label>Involved in Clinical Trials?</label>
        <select>
            <option>Yes, currently</option>
            <option>Yes, previously</option>
            <option>No</option>
        </select>

        <button type="submit">Submit</button>
    </form>
);


export default ClinicianForm
