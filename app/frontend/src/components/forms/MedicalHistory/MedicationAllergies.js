import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const MedicationAllergies = ({ setMedicationValue, patientMedications }) => {
  return (
    <div className="flex flex-col" style={{ flex: 1, minWidth: "300px" }}>
      <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
        Medication
      </strong>
    </div>
  );
};

MedicationAllergies.propTypes = {
  setMedicationValue: PropTypes.func.isRequired,
  patientMedications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MedicationAllergies;
