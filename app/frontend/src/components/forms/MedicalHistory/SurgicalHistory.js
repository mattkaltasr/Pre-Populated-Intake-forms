/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import _ from "lodash";
import TableRow from "./TableRow";

const SurgicalHistory = ({ patientAnswersSurgical }) => {
  const surgical = patientAnswersSurgical.surgical || [];

  const sliced = surgical.slice(Math.max(surgical.length - 3, 0));

  const normalized =
    sliced.length < 3
      ? [...sliced, ..._.range(0, 3 - sliced.length).map(() => ({}))]
      : sliced;

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
        {normalized.map((s, idx) => {
          return (
            <TableRow
              key={`${s.code}-${idx}`}
              onChange={() => {}}
              rowData={[
                { field: "code", value: s.display, disabled: true },
                {
                  field: "year",
                  value: s.date ? new Date(s.date).getFullYear() : "",
                  disabled: true,
                },
              ]}
            />
          );
        })}
      </div>
    </div>
  );
};

SurgicalHistory.propTypes = {};

export default SurgicalHistory;
