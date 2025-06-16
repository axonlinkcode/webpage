const RoleSelector = ({ onSelect }) => {
    return (
        <div className="selector">
            <h2>Choose our role</h2>
            <button onClick={() => onSelect('patient')}>Patient</button>
            <button onClick={() => onSelect('clinician')}>Clinician</button>
            <button onClick={() => onSelect('cro')}>CRO / Sponsor</button>
        </div>
    )
}

export default RoleSelector
