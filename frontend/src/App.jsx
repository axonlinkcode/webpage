import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import FormLayout from "./components/layout/FormLayout";
import PatientForm from "./components/form/PatientForm";
import ClinicianForm from "./components/form/ClinicianForm";
import CROForm from "./components/form/CROForm";
import Form from "./pages/form/Form";
import WaitingListForm from './components/waitingList/Forms'

import Admin from "./pages/admin/Admin";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='/axonNifemi' element={<Admin/>}/>
      </Route>

      {/* <Route path="/form" element={<FormLayout />}> */}
      <Route path="/forms" element={<FormLayout />} >
        <Route index element={<Form />} />
        <Route path="patient" element={<PatientForm />} />
        <Route path="clinician" element={<ClinicianForm />} />
        <Route path="cro" element={<CROForm />} />
        <Route path="waitingList" element={<WaitingListForm />} />
      </Route>
    </Routes>
  );
};

export default App;
