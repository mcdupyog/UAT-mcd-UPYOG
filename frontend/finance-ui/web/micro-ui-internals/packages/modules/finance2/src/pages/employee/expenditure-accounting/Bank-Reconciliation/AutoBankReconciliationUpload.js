import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  SubmitBar,
  Button,
  Toast,
} from "@egovernments/digit-ui-react-components";

const AutoBankReconciliationUpload = ({ t }) => {
  const [bank, setBank] = React.useState(null);
  const [branch, setBranch] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [file, setFile] = React.useState(null);

  const banks = [
    { code: "SBI", name: "State Bank of India" },
    { code: "ICICI", name: "ICICI Bank" },
  ];

  const branches = [
    { code: "001", name: "Main Branch" },
    { code: "002", name: "North Branch" },
  ];

  const accounts = [
    { code: "AC001", name: "XXXXXX1234" },
    { code: "AC002", name: "XXXXXX5678" },
  ];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!bank || !branch || !account || !file) {
      Toast({ label: "All fields are required", error: true });
      return;
    }

    const formData = new FormData();
    formData.append("bank", bank.code);
    formData.append("branch", branch.code);
    formData.append("account", account.code);
    formData.append("statement", file);

    console.log("Uploading: ", formData); // Replace with API call
    Toast({ label: "Uploaded successfully", success: true });
  };

  const handleClose = () => {
    window.history.back();
  };

  const downloadTemplate = () => {
    window.open("/templates/BankStatementTemplate.xlsx", "_blank");
  };

  return (
    <div style={{ padding: "1rem", background: "#fff" }}>
      <h2
        style={{
          background: "#2C3E50",
          color: "#fff",
          padding: "10px",
          fontSize: "1.2rem",
        }}
      >
        Auto Bank Reconciliation
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <LabelFieldPair>
          <label>
            Bank <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={banks}
            selected={bank}
            select={setBank}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Branch <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={branches}
            selected={branch}
            select={setBranch}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Bank Account <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={accounts}
            selected={account}
            select={setAccount}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            File to Upload <span style={{ color: "red" }}>*</span>
          </label>
          <div>
            <input type="file" onChange={handleFileChange} />
            <div>
              <Button
                label="Download Template"
                variation="link"
                type="button"
                onClick={downloadTemplate}
              />
            </div>
          </div>
        </LabelFieldPair>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        <SubmitBar label="Upload" onSubmit={handleUpload} />
        <Button label="Close" variation="secondary" onClick={handleClose} />
      </div>

      {/* Note Section */}
      <div style={{ color: "red", marginTop: "1rem", paddingLeft: "1rem" }}>
        <p><strong>Note:</strong></p>
        <ol>
          <li>Upload Bank Statement in the "Download Template" format.</li>
          <li>Use Reconcile Uploaded Statement menu item to process the statement.</li>
        </ol>
      </div>
    </div>
  );
};

export default AutoBankReconciliationUpload;
