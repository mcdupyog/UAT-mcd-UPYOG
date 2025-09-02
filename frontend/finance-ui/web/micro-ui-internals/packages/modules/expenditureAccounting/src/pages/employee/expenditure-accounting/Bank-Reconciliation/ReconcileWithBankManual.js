import React, { useState } from "react";
import {
  Card,
  CardLabel,
  Dropdown,
  TextInput,
  DatePicker,
  FormStep,
  SubmitBar
} from "@egovernments/digit-ui-react-components";

const ManualBankReconciliation = () => {
  const [formData, setFormData] = useState({
    bank: null,
    bankAccount: null,
    branch: null,
    reconciliationDate: null,
    bankStatementFromDate: null,
    bankStatementToDate: null,
    chequeNumber: "",
    limit: "100"
  });

  // Mock dropdown options (replace with MDMS or API data)
  const banks = [{ name: "SBI" }, { name: "HDFC" }];
  const accounts = [{ name: "1234567890" }, { name: "9876543210" }];
  const branches = [{ name: "Main Branch" }, { name: "East Branch" }];

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    console.log("Search clicked:", formData);
    // Call your API here
  };

  const handleShowPendings = () => {
    alert("Show Pendings clicked");
    // Call your pending API logic here
  };

  return (
    <Card>
      <FormStep config={{ label: "Manual Bank Reconciliation", isMandatory: false }}>
        <div className="row" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
          <div>
            <CardLabel>Bank *</CardLabel>
            <Dropdown
              option={banks}
              optionKey="name"
              selected={formData.bank}
              onChange={(value) => handleChange("bank", value)}
              placeholder="Choose Bank"
            />
          </div>

          <div>
            <CardLabel>Branch *</CardLabel>
            <Dropdown
              option={branches}
              optionKey="name"
              selected={formData.branch}
              onChange={(value) => handleChange("branch", value)}
              placeholder="Choose Branch"
            />
          </div>

          <div>
            <CardLabel>Bank Account *</CardLabel>
            <Dropdown
              option={accounts}
              optionKey="name"
              selected={formData.bankAccount}
              onChange={(value) => handleChange("bankAccount", value)}
              placeholder="Choose Account"
            />
          </div>

          <div>
            <CardLabel>Reconciliation Date *</CardLabel>
            <DatePicker
              date={formData.reconciliationDate}
              onChange={(value) => handleChange("reconciliationDate", value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div>
            <CardLabel>Bank Statement From Date *</CardLabel>
            <DatePicker
              date={formData.bankStatementFromDate}
              onChange={(value) => handleChange("bankStatementFromDate", value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div>
            <CardLabel>Bank Statement To Date *</CardLabel>
            <DatePicker
              date={formData.bankStatementToDate}
              onChange={(value) => handleChange("bankStatementToDate", value)}
              placeholder="DD/MM/YYYY"
            />
          </div>

          <div>
            <CardLabel>Cheque/DD/RTGS No</CardLabel>
            <TextInput
              value={formData.chequeNumber}
              onChange={(e) => handleChange("chequeNumber", e.target.value)}
              placeholder="Enter cheque no"
            />
          </div>

          <div>
            <CardLabel>Limit results by</CardLabel>
            <TextInput
              type="number"
              value={formData.limit}
              onChange={(e) => handleChange("limit", e.target.value)}
              placeholder="100"
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <SubmitBar label="Search" onSubmit={handleSearch} />
          <SubmitBar label="Show Pendings" onSubmit={handleShowPendings} />
          <SubmitBar label="Close" onSubmit={() => window.history.back()} />
        </div>
      </FormStep>
    </Card>
  );
};

export default ManualBankReconciliation;
