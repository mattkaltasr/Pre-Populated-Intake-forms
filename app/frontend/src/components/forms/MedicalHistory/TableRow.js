import React from "react";
import Checkbox from "../../formElements/Checkbox";

const TableRow = ({ header, rowData, onChange, asCheckbox }) => {
  return (
    <div className="flex" style={{ flex: 1 }}>
      {header || null}
      {(rowData || []).map((r) => {
        return (
          <div
            style={{
              flex: 1,
              display: "flex",
              border: "1px solid black",
            }}
          >
            {asCheckbox ? (
              <Checkbox
                style={{ flex: 1, margin: "0", borderRadius: 0 }}
                onChange={() => onChange(r.field)}
              />
            ) : (
              <input
                style={{
                  width: "1em",
                  flex: 1,
                  borderRadius: 0,
                  outline: "none",
                }}
                disabled={!!r.disabled}
                value={r.value}
                onChange={({ target: { value } }) => onChange(r.field, value)}
                className="input-field small"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
