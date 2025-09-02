import React, { useState } from "react";
import {
  LabelFieldPair,
  Dropdown,
  TextInput,
  DatePicker,
  SubmitBar,
  Button,
  Toast,
} from "@egovernments/digit-ui-react-components";

const BankReconciliationSummary = ({ t }) => {
  const [bank, setBank] = useState(null);
  const [branch, setBranch] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState("");
  const [date, setDate] = useState(null);

  // Sample dropdown options (Replace with MDMS or API data)
  const bankList = [
    { code: "SBI", name: "State Bank of India" },
    { code: "ICICI", name: "ICICI Bank" },
  ];

  const branchList = [
    { code: "001", name: "Main Branch" },
    { code: "002", name: "East Branch" },
  ];

  const accountList = [
    { code: "ACC001", name: "XXXXXXXX1234" },
    { code: "ACC002", name: "XXXXXXXX5678" },
  ];

  const handleSubmit = () => {
    if (!bank || !branch || !account || !balance || !date) {
      Toast({ label: "All fields are required", error: true });
      return;
    }

    const payload = {
      bank: bank.name,
      branch: branch.name,
      account: account.name,
      balance,
      date,
    };

    console.log("Payload submitted:", payload);
    Toast({ label: "Summary viewed successfully", success: true });
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div style={{ background: "#fff", padding: "1rem" }}>
      <h2
        style={{
          backgroundColor: "#2C3E50",
          color: "white",
          padding: "10px",
          fontSize: "1.2rem",
        }}
      >
        Reconciliation Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <LabelFieldPair>
          <label>
            Bank <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={bankList}
            optionKey="name"
            selected={bank}
            select={setBank}
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Branch <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={branchList}
            optionKey="name"
            selected={branch}
            select={setBranch}
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Account <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={accountList}
            optionKey="name"
            selected={account}
            select={setAccount}
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Statement Balance <span style={{ color: "red" }}>*</span>
          </label>
          <TextInput
            type="number"
            value={balance}
            onChange={(e) => setBalance(e.target.value)}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Statement Date <span style={{ color: "red" }}>*</span>
          </label>
          <DatePicker
            date={date}
            onChange={setDate}
            placeholder="DD/MM/YYYY"
          />
        </LabelFieldPair>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          gap: "1rem",
        }}
      >
        <SubmitBar label="View Summary" onSubmit={handleSubmit} />
        <Button label="Close" variation="secondary" onClick={handleClose} />
      </div>
    </div>
  );
};

export default BankReconciliationSummary;
