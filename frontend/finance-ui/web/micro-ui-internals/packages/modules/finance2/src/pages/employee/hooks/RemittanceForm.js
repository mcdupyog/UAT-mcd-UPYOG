import React, { useState } from "react";
import {
  Card,
  Dropdown,
  DatePicker,
  SubmitBar
} from "@egovernments/digit-ui-react-components";

const RemittanceForm = ({
  title = "Cash Remittance",
  accountOptions = [],
  financialYearOptions = [],
  onSearch
}) => {
  const [account, setAccount] = useState(null);
  const [financialYear, setFinancialYear] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const handleSubmit = () => {
    if (onSearch) {
      onSearch({ account, financialYear, fromDate, toDate });
    }
  };

  return (
    <Card>
      {/* 🔵 Header */}
      <div style={{ backgroundColor: "#2C3E50", color: "white", padding: "10px 16px", fontWeight: "bold", fontSize: "16px" }}>
        {title}
      </div>

      {/* 📋 Form */}
      <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "200px 1fr 100px 1fr", gap: "1rem", alignItems: "center" }}>
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

        <label style={{ fontWeight: "bold" }}>Financial Year:</label>
        <Dropdown
          selected={financialYear}
          option={financialYearOptions}
          select={(e) => setFinancialYear(e)}
          optionKey="name"
          t={(val) => val}
          placeholder="--Select--"
        />

        <label style={{ fontWeight: "bold" }}>From Date</label>
        <DatePicker
          date={fromDate}
          onChange={(date) => setFromDate(date)}
          placeholder="DD/MM/YYYY"
        />

        <label style={{ fontWeight: "bold" }}>To Date</label>
        <DatePicker
          date={toDate}
          onChange={(date) => setToDate(date)}
          placeholder="DD/MM/YYYY"
        />
      </div>

      {/* 🔍 Search */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <SubmitBar label="Search" onSubmit={handleSubmit} />
      </div>
    </Card>
  );
};

export default RemittanceForm;
