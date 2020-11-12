import React, { useEffect, useState, useRef } from "react";

import PatientInfo from "./components/forms/PatientInfo";
import { loadPatientById } from "./util/apiHelpers";

import FormContainer from "./components/containers/FormContainer";
import FormLabel from "./components/formElements/FormLabel";

import "./components/formElements/TextInput.css";

import "./App.css";

// fritz doyle example patientId "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";

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

    if (error) {
      alert('PatientId does not exist.')
    }
  }, [patientId]);

  return (
    <div className="app-container">
      <FormContainer
      title="Select a Patient"
      key="form-group-0"
      renderFormComponents={() => (
        <div className="flex" style={{ flex: 1, flexWrap: "wrap" }}>
          <div className="flex flex-col" style={{ flex: 1 }}>
            <div className="flex" style={{ flexWrap: "wrap" }}>
              <FormLabel title="Patient ID" />
                <form onSubmit={handleSubmit}>
                  <input
                    style={{ width: "100%", margin: "0px 5px" }}
                    className="input-field"
                    ref={inputRef}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                  />
                <button type="submit" style={{ margin: "5px 5px" }}>Submit</button>
                </form>
            </div>
          </div>
        </div>
        )}
      />
      <div className="app-container">
        <PatientInfo patientData={patientData} />
      </div>
    </div>
  );
}

export default App;
