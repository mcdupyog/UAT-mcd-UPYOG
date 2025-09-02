

import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Button,
  Toast,
  CustomDropdown,
  DatePicker,
  LabelFieldPair,
  CardLabel,
  BreakLine,
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const CONFIG = {
  bankBranch: {
    label: "---choose---",
    type: "dropdown",
    isMandatory: true,
    disable: false,
    populators: {
      name: "bankBranch",
      optionsKey: "label",
      optionsCustomStyle: { top: "2.3rem" },
      options: [
        { code: "sbi", label: "SBI BANK" },
        { code: "hdfc", label: "HDFC BANK" },
        { code: "icici", label: "ICICI BANK" },
      ],
      styles: { width: "100%" },
    },
  },
  bankAccount: {
    label: "---choose---",
    type: "dropdown",
    isMandatory: true,
    disable: false,
    populators: {
      name: "bankAccount",
      optionsKey: "label",
      optionsCustomStyle: { top: "2.3rem" },
      options: [
        { code: "sbi", label: "1234567890-SBI BANK" },
        { code: "hdfc", label: "63897421-HDFC BANK" },
        { code: "icici", label: "9876543210-ICICI BANK" },
      ],
      styles: { width: "100%" },
    },
  },
  department: {
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
  },
};

const INITIAL_FORM_DATA = {
  bankBranch: null,
  bankAccount: null,
  fromDate: null,
  toDate: null,
  department: null,
};

const FormField = ({ label, isMandatory = false, children }) => (
  <LabelFieldPair style={{ alignItems: "flex-start" }}>
    <CardLabel>
      {label} {isMandatory && <span style={{ color: "red" }}>*</span>}
    </CardLabel>
    {children}
  </LabelFieldPair>
);

const ChequeIssueFilterForm = ({ onSubmit, onReset }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const showToastMessage = useCallback((message, isError = false) => {
    setShowToast({ label: message, isError });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.bankBranch || !formData.bankAccount || !formData.department) {
      showToastMessage("Please fill all mandatory fields", true);
      return;
    }
    onSubmit(formData);
  }, [formData, onSubmit, showToastMessage]);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    onReset();
  }, [onReset]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <Card style={{ padding: "16px", marginBottom: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Filter Cheque Issue Report</h2>
      
      {showToast && (
        <Toast
          label={showToast.label}
          error={showToast.isError}
          isDleteBtn={true}
          onClose={() => setShowToast(null)}
        />
      )}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "24px",
        "@media (maxWidth: 768px)": {
          gridTemplateColumns: "1fr",
        }
      }}>
        {/* Left Column */}
        <div>
          <FormField label="Bank Branch Name:" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.bankBranch.populators}
              onChange={(e) => setFormData({ ...formData, bankBranch: e })}
              value={formData.bankBranch}
            />
          </FormField>
          

          <FormField label="Cheque From Date:">
            <DatePicker
              date={formData.fromDate}
              onChange={(date) => setFormData({ ...formData, fromDate: date })}
              placeholder="(dd/mm/yyyy)"
              style={{ width: "60%" }}
            />
          </FormField>

          <FormField label="Department" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.department.populators}
              onChange={(e) => setFormData({ ...formData, department: e })}
              value={formData.department}
            />
          </FormField>
        </div>

        {/* Right Column */}
        <div>
          <FormField label="Bank Account" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.bankAccount.populators}
              onChange={(e) => setFormData({ ...formData, bankAccount: e })}
              value={formData.bankAccount}
            />
          </FormField>

          <FormField label="Cheque To Date:">
            <DatePicker
              date={formData.toDate}
              onChange={(date) => setFormData({ ...formData, toDate: date })}
              placeholder="(dd/mm/yyyy)"
              style={{ width: "60%" }}
            />
          </FormField>
        </div>
      </div>

      <BreakLine style={{ height: "0.01rem", margin: "20px 0" }} />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button label="Submit" variation="primary" onClick={handleSubmit} />
        <Button label="Reset" variation="secondary" onClick={handleReset} />
      </div>
    </Card>
  );
};

export default ChequeIssueFilterForm;