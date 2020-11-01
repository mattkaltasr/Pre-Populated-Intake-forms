import React, { useEffect, useState } from "react";

import PatientInfo from "./components/forms/PatientInfo";
import { loadPatientById } from "./util/apiHelpers";

import "./App.css";

// fritz doyle
const TEST_PATIENT_ID = "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false); // we should show a loading message

  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    loadPatientById({
      patientId: TEST_PATIENT_ID,
      setData: (data) => {
        const [result] = data || [];
        if (result) {
          setPatientData(result);
        }
      },
      setError,
      setLoading,
    });
  }, []);

  return (
    <div className="app-container">
      <PatientInfo patientData={patientData} />
    </div>
  );
}

export default App;
