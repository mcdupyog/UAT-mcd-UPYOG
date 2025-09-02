import React, { useState } from "react";
import {
  Card,
  CardLabel,
  LabelFieldPair,
  Dropdown,
  SubmitBar,
} from "@egovernments/digit-ui-react-components";

const TransferClosingBalanceForm = ({ t = () => "" }) => {
  const [financialYear, setFinancialYear] = useState(null);

  const financialYears = [
    { code: "2024-25", name: "2024-2025" },
    { code: "2023-24", name: "2023-2024" },
  ];

  const handleTransfer = () => {
    console.log("Transferring for:", financialYear);
  };

  const handleClose = () => {
    console.log("Closing form.");
  };

  return (
    <Card style={{ width: "100%", padding: 0 }}>
      <div style={{ backgroundColor: "#2C3E50", color: "#fff", padding: "10px" }}>
        <h2 style={{ margin: 0 }}>Transfer Closing Balance</h2>
      </div>

      <div style={{ padding: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <LabelFieldPair>
            <CardLabel>Financial Year *</CardLabel>
            <Dropdown
              selected={financialYear}
              option={financialYears}
              select={setFinancialYear}
              optionKey="name"
              t={t}
              style={{ width: "100%" }}
              isMandatory
            />
          </LabelFieldPair>
        </div>

        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <SubmitBar label="Transfer" onSubmit={handleTransfer} />
          <button
            onClick={handleClose}
            style={{
              marginLeft: "1rem",
              padding: "10px 20px",
              border: "1px solid #2C3E50",
              backgroundColor: "green",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </Card>
  );
};

export default TransferClosingBalanceForm;
