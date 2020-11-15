import React from "react";
import PropTypes from "prop-types";

import VisitPreparation from "../forms/VisitPreparation";
import PatientInfo from "../forms/PatientInfo";
import MedicalHistory from "../forms/MedicalHistory";

const IntakeForm = ({ selectedPatientId }) => {
  return (
    <>
      <PatientInfo
        selectedPatientId={selectedPatientId}
        handleSubmit={() => {}}
      />
      <MedicalHistory
        selectedPatientId={selectedPatientId}
        handleSubmit={() => {}}
      />
      <VisitPreparation patientData={{}} handleSubmit={() => {}} />
    </>
  );
};

IntakeForm.propTypes = {
  selectedPatientId: PropTypes.string,
};

IntakeForm.defaultProps = {
  selectedPatientId: null,
};

export default IntakeForm;
