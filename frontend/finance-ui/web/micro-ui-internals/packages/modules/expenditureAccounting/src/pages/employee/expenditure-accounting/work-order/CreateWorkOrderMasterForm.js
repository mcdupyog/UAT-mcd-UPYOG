import React, { useState } from "react";
import {
  Card,
  CardLabel,
  Dropdown,
  TextInput,
  DatePicker,
  LabelFieldPair,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const CreateWorkOrderMasterForm = () => {
  const [formData, setFormData] = useState({
    orderNo: "",
    orderDate: null,
    orderName: "",
    description: "",
    zone: "NA",
    contractorName: null,
    contractorCode: "",
    totalOrderValue: "",
    fund: null,
    scheme: null,
    sanctionNo: "",
    sanctionDate: null,
    activeYN: true,
    advancePayable: "",
    department: null,
    subScheme: null,
  });

  // Sample dropdown options
  const contractorOptions = [
    { code: "Contractor1", name: "Contractor 1" },
    { code: "Contractor2", name: "Contractor 2" },
  ];

  const fundOptions = [
    { code: "Fund1", name: "Fund 1" },
    { code: "Fund2", name: "Fund 2" },
  ];

  const schemeOptions = [
    { code: "Scheme1", name: "Scheme 1" },
    { code: "Scheme2", name: "Scheme 2" },
  ];

  const departmentOptions = [
    { code: "Dept1", name: "Department 1" },
    { code: "Dept2", name: "Department 2" },
  ];

  const subSchemeOptions = [
    { code: "SubScheme1", name: "Sub Scheme 1" },
    { code: "SubScheme2", name: "Sub Scheme 2" },
  ];

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Form Submitted:\n" + JSON.stringify(formData, null, 2));
  };

  const handleClear = () => {
    setFormData({
      orderNo: "",
      orderDate: null,
      orderName: "",
      description: "",
      zone: "NA",
      contractorName: null,
      contractorCode: "",
      totalOrderValue: "",
      fund: null,
      scheme: null,
      sanctionNo: "",
      sanctionDate: null,
      activeYN: true,
      advancePayable: "",
      department: null,
      subScheme: null,
    });
  };

  const handleClose = () => {
    window.history.back();
  };

  return (
    <div style={{ background: "#fff", padding: "1rem", marginTop: "1rem" }}>
      <h2
        style={{
          backgroundColor: "#2C3E50",
          color: "white",
          padding: "10px",
          fontSize: "1.2rem",
          textAlign: "left",
          borderRadius: "4px",
        }}
      >
        Work Order Master
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        {/* Left Section */}
        <LabelFieldPair>
          <CardLabel>Order No *</CardLabel>
          <TextInput
            value={formData.orderNo}
            onChange={handleInputChange("orderNo")}
            placeholder="Enter Order No"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Order Date *</CardLabel>
          <DatePicker
            date={formData.orderDate}
            onChange={handleChange("orderDate")}
            placeholder="Select Order Date"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Order Name *</CardLabel>
          <TextInput
            value={formData.orderName}
            onChange={handleInputChange("orderName")}
            placeholder="Enter Order Name"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Description</CardLabel>
          <TextInput
            value={formData.description}
            onChange={handleInputChange("description")}
            placeholder="Enter Description"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Zone</CardLabel>
          <TextInput
            value={formData.zone}
            onChange={handleInputChange("zone")}
            placeholder="Zone"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Contractor Name *</CardLabel>
          <Dropdown
            option={contractorOptions}
            optionKey="name"
            selected={formData.contractorName}
            select={handleChange("contractorName")}
            placeholder="Select Contractor"
            isMandatory
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Contractor Code</CardLabel>
          <TextInput
            value={formData.contractorCode}
            onChange={handleInputChange("contractorCode")}
            placeholder="Contractor Code"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Total Order Value *</CardLabel>
          <TextInput
            type="number"
            value={formData.totalOrderValue}
            onChange={handleInputChange("totalOrderValue")}
            placeholder="Total Value"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Fund *</CardLabel>
          <Dropdown
            option={fundOptions}
            optionKey="name"
            selected={formData.fund}
            select={handleChange("fund")}
            placeholder="Select Fund"
            isMandatory
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Scheme</CardLabel>
          <Dropdown
            option={schemeOptions}
            optionKey="name"
            selected={formData.scheme}
            select={handleChange("scheme")}
            placeholder="Select Scheme"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Sub Scheme</CardLabel>
          <Dropdown
            option={subSchemeOptions}
            optionKey="name"
            selected={formData.subScheme}
            select={handleChange("subScheme")}
            placeholder="Select Sub Scheme"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Department *</CardLabel>
          <Dropdown
            option={departmentOptions}
            optionKey="name"
            selected={formData.department}
            select={handleChange("department")}
            placeholder="Select Department"
            isMandatory
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Sanction No</CardLabel>
          <TextInput
            value={formData.sanctionNo}
            onChange={handleInputChange("sanctionNo")}
            placeholder="Sanction Number"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Sanction Date</CardLabel>
          <DatePicker
            date={formData.sanctionDate}
            onChange={handleChange("sanctionDate")}
            placeholder="Select Date"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Advance Payable</CardLabel>
          <TextInput
            type="number"
            value={formData.advancePayable}
            onChange={handleInputChange("advancePayable")}
            placeholder="Advance Payable"
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <CardLabel>Active Y/N</CardLabel>
          <div style={{ paddingTop: "8px" }}>
            <input
              type="checkbox"
              checked={formData.activeYN}
              onChange={(e) => handleChange("activeYN")(e.target.checked)}
            />{" "}
            Active
          </div>
        </LabelFieldPair>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem", gap: "1rem" }}>
        <SubmitBar label="Create" onSubmit={handleSubmit} />
        <Button label="Clear" variation="secondary" onClick={handleClear} />
        <Button label="Close" variation="secondary" onClick={handleClose} />
      </div>
    </div>
  );
};

export default CreateWorkOrderMasterForm;
