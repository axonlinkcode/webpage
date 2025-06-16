import { Link } from 'react-router-dom'
import RoleSelector from '../../components/form/RoleSelector'
import PatientForm from '../../components/form/PatientForm'
import ClinicianForm from '../../components/form/ClinicianForm'
import CROForm from '../../components/form/CROForm'
import { useState } from 'react'


const Form = () => {
    const [role, setRole] = useState(null)
    const renderForm = () => {
        if (role === 'patient') return <PatientForm />;
        if (role === 'clinician') return <ClinicianForm />;
        if (role === 'cro') return <CROForm />;
        return <RoleSelector onSelect={setRole} />;
    };
    return (
        <div>
            <h1>form</h1>
            <Link to='/'>back to home</Link>
            <Link to='/form'>back to forms</Link>
            {renderForm()}
        </div>
    )
}

export default Form
