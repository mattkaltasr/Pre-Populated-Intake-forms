import React, { useEffect, useState, useRef } from "react";

import PatientInfo from "./components/forms/PatientInfo";
import { loadPatientById } from "./util/apiHelpers";

import "./App.css";

// fritz doyle
// const TEST_PATIENT_ID = "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false); // we should show a loading message

  const [patientData, setPatientData] = useState({});

  const inputRef = useRef();
  const [value, setValue] = useState("");
  const [patientId, setPatientId] = useState(null);

  const handleSubmit = event => {
    event.preventDefault();
    setPatientId(value);
  }

  useEffect(() => {
    if (patientId) {
      loadPatientById({
        patientId: patientId,
        setData: (data) => {
          const [result] = data || [];
          if (result) {
            setPatientData(result);
          }
        },
        setError,
        setLoading,
      });
    }
  }, [patientId]);

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="app-container">
        <PatientInfo patientData={patientData} />
      </div>
    </div>
  );
}

export default App;
