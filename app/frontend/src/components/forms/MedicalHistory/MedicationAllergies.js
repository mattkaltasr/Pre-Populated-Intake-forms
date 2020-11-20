import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TableRow from "./TableRow";

const MedicationAllergies = ({ setMedicationValue, patientMedications }) => {
  return (
    <div
      className="flex flex-col"
      style={{
        flex: 1,
        minWidth: "300px",
        marginRight: "0.5em",
      }}
    >
      <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
        Medication Allergies
      </strong>
      <div className="flex flex-col">
        <div className="flex" id="table-header">
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              border: "1px solid black",
              padding: "0.25em",
              textAlign: "center",
              fontSize: "0.8em",
            }}
          >
            <strong>Medication</strong>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.1)",
              border: "1px solid black",
              padding: "0.25em",
              textAlign: "center",
              fontSize: "0.8em",
            }}
          >
            <strong>Reaction</strong>
          </div>
        </div>
        <TableRow
          rowData={[
            { field: "medication", value: "N/A" },
            { field: "Reaction", value: "none" },
          ]}
        />
        <TableRow
          rowData={[
            { field: "medication", value: "N/A" },
            { field: "Reaction", value: "none" },
          ]}
        />
        <TableRow
          rowData={[
            { field: "medication", value: "N/A" },
            { field: "Reaction", value: "none" },
          ]}
        />
      </div>
    </div>
  );
};

MedicationAllergies.propTypes = {
  setMedicationValue: PropTypes.func.isRequired,
  patientMedications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MedicationAllergies;
