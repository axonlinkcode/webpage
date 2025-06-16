import LandingPage from "./pages/LandingPage";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import FormLayout from "./components/layout/FormLayout";
import PatientForm from "./components/form/PatientForm";
import Form from "./pages/form/Form";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* <Route path="/form" element={<FormLayout />}> */}
        <Route path="/form" element={<Form />} />
        <Route path="/patient" element={<PatientForm />} />
      {/* </Route> */}
    </Routes>
  );
};

export default App;
