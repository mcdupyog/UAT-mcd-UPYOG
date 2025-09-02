
import React, { useState, useRef } from "react";
import { Card, CustomDropdown, Button, TextInput, LabelFieldPair, CardLabel, Toast, BreakLine } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

// Dummy data configurations
const billTypeConfig = {
  label: "---choose---",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "billType",
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

const BillVoucherForm = () => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const inputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    billType: null,
    billType: null,
    fromDate: "",
    billNumber: "",
    billDate: "",
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
          <h1>📊 Create Voucher From Bill</h1>
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
                Bill Type <span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={billTypeConfig.populators}
                onChange={(e) => setFormData({ ...formData, billType: e })}
                value={formData.billType}
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>From Date</CardLabel>
              <TextInput
                value={formData.fromDate}
                onChange={(e) => setFormData({ ...formData, fromDate: e.target.value })}
                placeholder="(dd/mm/yyyy)"
                style={{ width: "100%" }}
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>Bill Number</CardLabel>
              <TextInput
                value={formData.billNumber}
                onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                style={{ width: "100%" }}
              />
            </LabelFieldPair>
          </div>

          {/* Right Column */}
          <div>
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

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>Bill Date</CardLabel>
              <TextInput
                value={formData.billDate}
                onChange={(e) => setFormData({ ...formData, billDate: e.target.value })}
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
                fromDate: "",
                billNumber: "",
                billDate: "",
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

export default BillVoucherForm;
