import React from "react";
import PropTypes from "prop-types";

import { loadPatientById } from "../../util/apiHelpers";
import VisitPreparation from "../forms/VisitPreparation";
import PatientInfo from "../forms/PatientInfo";
import MedicalHistory from "../forms/MedicalHistory";

const IntakeForm = ({ patientId }) => {
  const [patientData, setPatientData] = React.useState({});
  const [patientAnswers, setPatientAnswers] = React.useState({});

  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    loadPatientById({
      patientId,
      setData: (data) => {
        const [result] = data || [];
        if (result) {
          setPatientData(result);
        }
      },
      setError,
      setLoading,
    });
  }, [patientId]);

  if (error || isLoading) {
    console.log("handle these");
  }

  return (
    <>
      <PatientInfo patientData={patientData} />
      <MedicalHistory patientData={patientData} />
      <VisitPreparation
        patientData={patientData}
        handleSubmit={(answers) => {
          setPatientAnswers({
            ...patientAnswers,
            visitPreparation: {
              ...patientAnswers.visitPreparation,
              ...answers,
            },
          });
        }}
      />
    </>
  );
};

IntakeForm.propTypes = {
  patientId: PropTypes.string.isRequired,
};

export default IntakeForm;
