import React from "react";
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

const FamilyMedicalHistory = () => {
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
        <div className="flex" style={{ flex: 1 }}>
          <TableRow
            header={
              <div
                className="flex"
                style={{ flex: 1, border: "1px solid black" }}
              >
                <span
                  style={{ flex: 0.25, margin: "auto", fontSize: "0.85em" }}
                >
                  Cancer
                </span>
              </div>
            }
            asCheckbox
            rowData={[
              { field: "mother", value: "" },
              { field: "father", value: "" },
              { field: "brother", value: "" },
              { field: "sister", value: "" },
            ]}
          />
        </div>
        <div className="flex" style={{ flex: 1 }}>
          <TableRow
            header={
              <div
                className="flex"
                style={{ flex: 1, border: "1px solid black" }}
              >
                <span
                  style={{ flex: 0.25, margin: "auto", fontSize: "0.85em" }}
                >
                  Diabetes
                </span>
              </div>
            }
            asCheckbox
            rowData={[
              { field: "mother", value: "" },
              { field: "father", value: "" },
              { field: "brother", value: "" },
              { field: "sister", value: "" },
            ]}
          />
        </div>
        <div className="flex" style={{ flex: 1 }}>
          <TableRow
            header={
              <div
                className="flex"
                style={{
                  flex: 1,
                  border: "1px solid black",
                }}
              >
                <span
                  style={{
                    flex: 0.25,
                    margin: "auto",
                    fontSize: "0.85em",
                    whiteSpace: "pre",
                  }}
                >
                  Heart Disease
                </span>
              </div>
            }
            asCheckbox
            rowData={[
              { field: "mother", value: "" },
              { field: "father", value: "" },
              { field: "brother", value: "" },
              { field: "sister", value: "" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default FamilyMedicalHistory;
