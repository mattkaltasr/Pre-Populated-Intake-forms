/* eslint-disable react/prop-types */
import React from "react";
import _ from "lodash";

import TableRow from "./TableRow";

const HeaderCell = ({ title }) => (
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
    <strong>{title}</strong>
  </div>
);

const FamilyMedicalHistory = ({ medicalHistory }) => {
  const byFamilyMember = _.groupBy(medicalHistory, (m) =>
    _.get(m, "relationship")
  );

  return (
    <div className="flex flex-col">
      <strong style={{ flex: 1, fontSize: "0.85em", marginBottom: "0.5em" }}>
        Family Medical History
      </strong>
      <div className="flex" id="table-header">
        <HeaderCell title="" />
        <HeaderCell title="Mother" />
        <HeaderCell title="Father" />
        <HeaderCell title="Brother" />
        <HeaderCell title="Sister" />
      </div>
      <div>
        {[
          { display: "Cancer", code: "395099008" },
          { display: "Diabetes", code: "73211009" },
          { display: "Heart Disease", code: "78941-2" },
        ].map((m) => {
          return (
            <div className="flex" style={{ flex: 1 }} key={m.display}>
              <TableRow
                onChange={() => {}}
                header={
                  <div
                    className="flex"
                    style={{ flex: 1, border: "1px solid black" }}
                  >
                    <span
                      style={{ flex: 0.25, margin: "auto", fontSize: "0.85em" }}
                    >
                      {m.display}
                    </span>
                  </div>
                }
                asCheckbox
                rowData={[
                  {
                    field: "mother",
                    value: !!(byFamilyMember.mother || []).find(
                      (d) => d.condition.code === m.code
                    ),
                  },
                  {
                    field: "father",
                    value: !!(byFamilyMember.father || []).find(
                      (d) => d.condition.code === m.code
                    ),
                  },
                  {
                    field: "brother",
                    value: !!(byFamilyMember.brother || []).find(
                      (d) => d.condition.code === m.code
                    ),
                  },
                  {
                    field: "sister",
                    value: !!(byFamilyMember.sister || []).find(
                      (d) => d.condition.code === m.code
                    ),
                  },
                ]}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FamilyMedicalHistory;
