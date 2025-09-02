import React, { useState, useRef } from "react";
import { Card, CustomDropdown, Button, TextInput, LabelFieldPair, CardLabel, Toast, BreakLine } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

// Dummy data configurations
const expenditureTypeConfig = {
  label: "---choose---",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "expenditureType",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "expense", label: "Expense" },
      { code: "purchase", label: "Purchase" },
      { code: "works", label: "Works" },
    ],
    styles: { width: "100%" },
  },
};

const fundTypeConfig = {
  label: "---choose---",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "fundType",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "expense", label: "Municipal Fund" }
    ],
    styles: { width: "100%" },
  },
};

const departmentConfig = {
  label: "DEPARTMENT",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "department",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "finance", label: "Finance Department" },
      { code: "admin", label: "Administration Department" },
      { code: "engineering", label: "Engineering Department" },
    ],
    styles: { width: "100%" },
  },
};

const BillRegisterSearch = () => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    expenditureType: null,
    billDatefrom: "",
    fundType: "",
    billNumber: "",
    billDateto: "",
    department: null,
  });

  return (
    <React.Fragment>
      <div
        style={{
          fontFamily: "semibold", // Changed hyphen to camelCase
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          background: "#34495E",
          borderColor: "#337ab7 !important", // Remove !important as it doesn't work in inline styles
          borderLeft: "5px solid #337ab7", // Added color for borderLeft
          borderBottom: "1px solid #337ab7", // Added color for borderBottom
          textAlign: "left", // Changed to camelCase

          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "8px 15px", // Uncommented and standardized
        }}
      >
        <div>
          <h1>📊 View Bill Registers</h1>
        </div>
      </div>

      {showToast && <Toast label={showToast.label} error={showToast?.isError} isDleteBtn={true} onClose={() => setShowToast(null)} />}

      {/* Main Form */}
      <Card>
        <div style={{ display: "grid", padding: "10px 10% 10px", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
          {/* Left Column */}
          <div>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                Expenditure Type<span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={expenditureTypeConfig.populators}
                onChange={(e) => setFormData({ ...formData, expenditureType: e })}
                value={formData.expenditureType}
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>Bill Date From *</CardLabel>
              <TextInput
                value={formData.billDatefrom}
                onChange={(e) => setFormData({ ...formData, billDatefrom: e.target.value })}
                placeholder="(dd/mm/yyyy)"
                style={{ width: "100%" }}
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                Fund<span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={fundTypeConfig.populators}
                onChange={(e) => setFormData({ ...formData, fundType: e })}
                value={formData.fundType}
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                Department <span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={departmentConfig.populators}
                onChange={(e) => setFormData({ ...formData, department: e })}
                value={formData.department}
              />
            </LabelFieldPair>
          </div>

          {/* Right Column */}
          <div>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>Bill Number</CardLabel>
              <TextInput
                value={formData.billNumber}
                onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                style={{ width: "100%" }}
              />
            </LabelFieldPair>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>Bill Date to</CardLabel>
              <TextInput
                value={formData.billDateto}
                onChange={(e) => setFormData({ ...formData, billDateto: e.target.value })}
                placeholder="(dd/mm/yyyy)"
                style={{ width: "100%" }}
              />
            </LabelFieldPair>
          </div>
        </div>

        <BreakLine style={{ height: "0.01rem" }} />

        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "2rem" }}>
          <Button label="Search" variation="primary" />
          <Button
            label="Clear Form"
            variation="secondary"
            onButtonClick={() => {
              setFormData({
                billType: null,
                billDatefrom: "",
                fundType: "",
                billNumber: "",
                billDateto: "",
                department: null,
              });
            }}
            type="button"
          />

          <Button label="Close" variation="secondary" />
        </div>
      </Card>
    </React.Fragment>
  );
};

export default BillRegisterSearch;
