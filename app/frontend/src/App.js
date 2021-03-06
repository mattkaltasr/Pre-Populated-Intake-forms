import React from "react";

import IntakeForm from "./components/pages/IntakeForm";
import ConsentForm from "./components/pages/ConsentForm";
import FormContainer from "./components/containers/FormContainer";
import FormLabel from "./components/formElements/FormLabel";

/** css is globally scoped */
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import "./App.css";

// fritz doyle example patientId "fb7a640d-1f8e-4320-9e07-20f27f8e18f2";
// example patient id with medication "40f680c8-238b-426b-b1c0-1649c780ce69"

const DEV_MODE = false;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();

    this.inputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  getInitialState() {
    if (DEV_MODE) {
      return {
        selectedPatientId: null,
        didConsent: true,
        // patientIdText: "35c77a1a-18c5-4399-8a31-5a1e46bba83e", // surgical hist
        patientIdText: "40f680c8-238b-426b-b1c0-1649c780ce69",
      };
    }

    return {
      selectedPatientId: null,
      didConsent: false,
      patientIdText: "",
    };
  }

  componentDidMount() {
    const { patientIdText } = this.state;
    if (patientIdText) {
      this.setState({ selectedPatientId: patientIdText });
    }
  }

  handleSubmit(e) {
    const { patientIdText } = this.state;

    e.preventDefault();

    this.setState({ selectedPatientId: patientIdText });
  }

  render() {
    const { selectedPatientId, didConsent, patientIdText } = this.state;

    return (
      <div className="app-container">
        {!didConsent ? (
          <ConsentForm
            handleConsentAgree={(val) => this.setState({ didConsent: val })}
          />
        ) : (
          <>
            <FormContainer
              title="Select a Patient"
              formComponents={
                <div className="flex" style={{ flex: 1, flexWrap: "wrap" }}>
                  <div className="flex flex-col" style={{ flex: 1 }}>
                    <div className="flex" style={{ flexWrap: "wrap" }}>
                      <FormLabel title="Patient ID" />
                      <form onSubmit={this.handleSubmit}>
                        <input
                          style={{ width: "100%", margin: "0px 5px" }}
                          className="input-field"
                          ref={this.inputRef}
                          value={patientIdText}
                          onChange={(e) =>
                            this.setState({ patientIdText: e.target.value })
                          }
                        />
                        <button
                          type="submit"
                          className="submit-button"
                          style={{ margin: "5px 5px" }}
                          disabled={!patientIdText}
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              }
            />
            <IntakeForm selectedPatientId={selectedPatientId} />
          </>
        )}
      </div>
    );
  }
}

export default App;
