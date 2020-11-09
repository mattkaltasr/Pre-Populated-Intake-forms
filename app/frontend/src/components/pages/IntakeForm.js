import React from "react";
import PropTypes from "prop-types";

import { loadPatientById } from "../../util/apiHelpers";
import VisitPreparation from "../forms/VisitPreparation";
import PatientInfo from "../forms/PatientInfo";

const IntakeForm = ({ patientId }) => {
  const [patientData, setPatientData] = React.useState({});
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
      <VisitPreparation patientData={patientData} handleSubmit={() => {}} />
      <PatientInfo patientData={patientData} />
    </>
  );
};

IntakeForm.propTypes = {
  patientId: PropTypes.string.isRequired,
};

export default IntakeForm;
