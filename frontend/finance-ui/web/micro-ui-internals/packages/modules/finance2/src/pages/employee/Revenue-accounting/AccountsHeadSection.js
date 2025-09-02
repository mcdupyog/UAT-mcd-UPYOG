import React, { useState } from "react";
import { TextInput } from "@egovernments/digit-ui-react-components";

const AccountsHeadSection = () => {
  const [rows, setRows] = useState([{ accountHead: "", amount: 0 }]);

  const handleRowChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = field === "amount" ? parseFloat(value || 0) : value;
    setRows(updated);
  };

  const totalAmount = rows.reduce((sum, row) => sum + Number(row.amount || 0), 0);

  return (
    <div style={{ marginTop: "20px", border: "1px solid #ccc" }}>
      {/* Section Header */}
      <div style={{ backgroundColor: "#2C3E50", padding: "12px 16px" }}>
        <h2 style={{ margin: 0, color: "white", fontSize: "18px" }}>
          Accounts Head
        </h2>
      </div>

      {/* Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#2C3E50", color: "white" }}>
            <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "left" }}>
              Account Head <span style={{ color: "red" }}>*</span>
            </th>
            <th style={{ padding: "8px", border: "1px solid #ccc", textAlign: "left" }}>
              Amount (Rs.)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} style={{ backgroundColor: "#fff" }}>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                <TextInput
                  value={row.accountHead}
                  onChange={(e) => handleRowChange(idx, "accountHead", e.target.value)}
                  placeholder="Enter Account Head"
                  style={{ width: "100%", border: "1px solid green" }}
                />
              </td>
              <td style={{ padding: "8px", border: "1px solid #ccc" }}>
                <TextInput
                  type="number"
                  value={row.amount}
                  onChange={(e) => handleRowChange(idx, "amount", e.target.value)}
                  placeholder="0"
                  style={{ width: "100%", border: "1px solid green" }}
                />
              </td>
            </tr>
          ))}
          {/* Total Row */}
          <tr style={{ backgroundColor: "#f4f4f4", fontWeight: "bold" }}>
            <td style={{ padding: "8px", border: "1px solid #ccc", textAlign: "right" }}>
              Total
            </td>
            <td style={{ padding: "8px", border: "1px solid #ccc" }}>
              <TextInput
                value={totalAmount}
                disabled
                style={{ width: "100%", border: "1px solid green" }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AccountsHeadSection;
