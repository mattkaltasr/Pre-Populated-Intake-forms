import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import TableRow from "./TableRow";

const SurgicalHistory = ({ setMedicationValue, patientMedications }) => {
  return (
    <div
      className="flex flex-col"
      style={{ flex: 1, minWidth: "300px", marginLeft: "0.5em" }}
    >
      <strong style={{ flex: 1, fontSize: "0.85em", padding: "0.25em" }}>
        Surgical History
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
            <strong>Surgery</strong>
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
            <strong>Year</strong>
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

SurgicalHistory.propTypes = {
  setMedicationValue: PropTypes.func.isRequired,
  patientMedications: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SurgicalHistory;
