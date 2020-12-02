/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from "react";
import _ from "lodash";

import TableRow from "./TableRow";

const MedicationAllergies = ({ medicationAllergies }) => {
  const sliced = medicationAllergies.slice(
    Math.max(medicationAllergies.length - 3, 0)
  );

  const normalized =
    sliced.length < 3
      ? [...sliced, ..._.range(0, 3 - sliced.length).map(() => ({}))]
      : sliced;

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
        {normalized.map((s, idx) => (
          <TableRow
            key={idx}
            onChange={() => {}}
            rowData={[
              { field: "medication", value: _.get(s.medication, "display") },
              {
                field: "reaction",
                value: _.get(s.reaction, "display", ""),
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default MedicationAllergies;
