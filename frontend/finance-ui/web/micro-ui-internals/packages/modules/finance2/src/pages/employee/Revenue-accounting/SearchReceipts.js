import React, { useState } from "react";
import {
  Card,
  TextInput,
  DatePicker,
  SubmitBar,
  CardLabel,
  LabelFieldPair,
  Dropdown,
} from "@egovernments/digit-ui-react-components";

const classificationOptions = [
  { code: "MISCELLANEOUS", name: "MISCELLANEOUS" },
];

const serviceTypeOptions = [
  { code: "WATER", name: "Water" },
  { code: "PROPERTY", name: "Property Tax" },
];

const SearchReceipts = () => {
  const [formData, setFormData] = useState({
    classification: classificationOptions[0],
    serviceType: null,
    fromDate: null,
    toDate: null,
    receiptNumber: "",
  });

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSearch = () => {
    console.log("Search clicked", formData);
  };

  const handleReset = () => {
    setFormData({
      classification: classificationOptions[0],
      serviceType: null,
      fromDate: null,
      toDate: null,
      receiptNumber: "",
    });
  };

  return (
    <Card style={{ width: "100%", padding: "0", boxSizing: "border-box" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2C3E50", color: "#fff", padding: "10px" }}>
        <h2 style={{ margin: 0 }}>Search Receipts</h2>
      </div>

      {/* Form Body */}
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ color: "#8E3200", marginBottom: "1rem" }}>Search Criteria</h3>

        {/* Grid form layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          <LabelFieldPair>
            <CardLabel>Classification *</CardLabel>
            <Dropdown
              selected={formData.classification}
              option={classificationOptions}
              select={handleChange("classification")}
              optionKey="name"
              t={() => ""}
              style={{ width: "100%" }}
            />
          </LabelFieldPair>

          <LabelFieldPair>
            <CardLabel>Service Type *</CardLabel>
            <Dropdown
              selected={formData.serviceType}
              option={serviceTypeOptions}
              select={handleChange("serviceType")}
              optionKey="name"
              placeholder="Select Service Type"
              t={() => ""}
              style={{ width: "100%" }}
            />
          </LabelFieldPair>

          <LabelFieldPair>
            <CardLabel>From Date</CardLabel>
            <DatePicker
              date={formData.fromDate}
              onChange={handleChange("fromDate")}
              placeholder="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </LabelFieldPair>

          <LabelFieldPair>
            <CardLabel>To Date</CardLabel>
            <DatePicker
              date={formData.toDate}
              onChange={handleChange("toDate")}
              placeholder="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </LabelFieldPair>

          <LabelFieldPair>
            <CardLabel>Receipt number</CardLabel>
            <TextInput
              value={formData.receiptNumber}
              onChange={(e) => handleChange("receiptNumber")(e.target.value)}
              style={{ width: "100%" }}
            />
          </LabelFieldPair>
        </div>

        {/* Buttons */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <SubmitBar label="Search" onSubmit={handleSearch} />
          <button
            onClick={handleReset}
            style={{
              marginTop: "0.5rem",
              background: "#fff",
              border: "1px solid green",
              padding: "8px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              marginLeft: "1rem",
              color: "green",
              fontWeight: "bold",
            }}
          >
            Reset
          </button>
        </div>

        {/* No Results Bar */}
        <div
          style={{
            backgroundColor: "#2C3E50",
            color: "#fff",
            padding: "10px",
            marginTop: "2rem",
          }}
        >
          Search returned no results
        </div>
      </div>
    </Card>
  );
};

export default SearchReceipts;
