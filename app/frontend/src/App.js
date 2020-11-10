import React from "react";

import IntakeForm from "./components/pages/IntakeForm";
import ConsentForm from "./components/pages/ConsentForm";

import "./App.css";

// fritz doyle
const TEST_PATIENT_ID = "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUserId: TEST_PATIENT_ID,
      didConsent: true,
    };
  }

  render() {
    const { selectedUserId, didConsent } = this.state;

    return (
      <div className="app-container">
        {didConsent ? (
          <IntakeForm patientId={selectedUserId} />
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
