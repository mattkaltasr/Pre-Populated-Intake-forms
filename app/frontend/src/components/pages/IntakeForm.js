import React from "react";
import PropTypes from "prop-types";

import { loadPatientById } from "../../util/apiHelpers";
import VisitPreparation from "../forms/VisitPreparation";
import PatientInfo from "../forms/PatientInfo";
import MedicalHistory from "../forms/MedicalHistory";

const IntakeForm = ({ selectedPatientId }) => {
  const [patientData, setPatientData] = React.useState({});
  const [patientAnswers, setPatientAnswers] = React.useState({});

  const [error, setError] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (selectedPatientId) {
      loadPatientById({
        patientId: selectedPatientId,
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
  }, [selectedPatientId]);

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
  selectedPatientId: PropTypes.string,
};

IntakeForm.defaultProps = {
  selectedPatientId: null,
};

export default IntakeForm;
