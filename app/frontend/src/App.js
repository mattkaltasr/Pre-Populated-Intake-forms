import React, { useEffect, useState } from "react";

import PatientInfo from "./components/forms/PatientInfo";
import VisitPreparation from "./components/forms/VisitPreparation";
import { loadPatientById } from "./util/apiHelpers";
import ConsentForm from "./components/forms/ConsentForm";

import "./App.css";

// fritz doyle
const TEST_PATIENT_ID = "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoading: false,
      selectedUserId: null,
      didConsent: false,
      patientData: {},
    };

    this.loadPatientData = this.loadPatientData.bind(this);
  }

  async loadPatientData() {
    loadPatientById({
      patientId: TEST_PATIENT_ID,
      setData: (data) => {
        const [result] = data || [];
        if (result) {
          this.setState({
            patientData: result,
          });
        }
      },
      setError: (err) => this.setState({ error: err }),
      setLoading: () => this.setState({ isLoading: false }),
    });
  }

  render() {
    const {
      error,
      isLoading,
      patientData,
      selectedUserId,
      didConsent,
    } = this.state;

    return (
      <div className="app-container">
        {didConsent ? (
          <div>
            <VisitPreparation
              patientData={patientData}
              handleSubmit={() => {}}
            />
            <PatientInfo patientData={patientData} />
          </div>
        ) : (
          <ConsentForm
            handleConsentAgree={(val) => this.setState({ didConsent: val })}
          />
        )}
      </div>
    );
  }
}

export default App;
