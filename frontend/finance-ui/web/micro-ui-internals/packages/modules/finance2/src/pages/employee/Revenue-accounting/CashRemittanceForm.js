import React, { useState } from "react";
import {
  Card,
  CardLabel,
  LabelFieldPair,
  Dropdown,
  DatePicker,
  SubmitBar
} from "@egovernments/digit-ui-react-components";

const CashRemittanceForm = () => {
  const [account, setAccount] = useState(null);
  const [financialYear, setFinancialYear] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const accountOptions = [
    { code: "acc1", name: "Account 1" },
    { code: "acc2", name: "Account 2" },
  ];

  const financialYearOptions = [
    { code: "2023-24", name: "2023–2024" },
    { code: "2024-25", name: "2024–2025" },
  ];

  const handleSearch = () => {
    console.log({ account, financialYear, fromDate, toDate });
  };

  return (
    <Card>
      {/* 🔵 Header */}
      <div style={{ backgroundColor: "#2C3E50", color: "white", padding: "10px 16px", fontWeight: "bold", fontSize: "16px" }}>
        Cash Remittance
      </div>

      {/* 📋 Form Body */}
      <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "200px 1fr 100px 1fr", gap: "1rem", alignItems: "center" }}>
        {/* Row 1: Account Number */}
        <label style={{ fontWeight: "bold" }}>
          Account Number: <span style={{ color: "red" }}>*</span>
        </label>
        <Dropdown
          selected={account}
          option={accountOptions}
          select={(e) => setAccount(e)}
          optionKey="name"
          t={(val) => val}
          placeholder="Select"
        />

        {/* Row 2: Financial Year */}
        <label style={{ fontWeight: "bold" }}>Financial Year:</label>
        <Dropdown
          selected={financialYear}
          option={financialYearOptions}
          select={(e) => setFinancialYear(e)}
          optionKey="name"
          t={(val) => val}
          placeholder="--Select--"
        />

        {/* Row 3: From Date */}
        <label style={{ fontWeight: "bold" }}>From Date</label>
        <DatePicker
          date={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholder="DD/MM/YYYY"
        />

        {/* Row 4: To Date */}
        <label style={{ fontWeight: "bold", textAlign: "right" }}>To Date</label>
        <DatePicker
          date={toDate}
          onChange={(date) => setToDate(date)}
          placeholder="DD/MM/YYYY"
        />
      </div>

      {/* 🔍 Search Button */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <SubmitBar label="Search" onSubmit={handleSearch} />
      </div>
    </Card>
  );
};

export default CashRemittanceForm;
