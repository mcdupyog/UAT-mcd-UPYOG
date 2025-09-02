

import React, { useState, useCallback, useEffect } from "react";
import { Card, Button, Toast, CustomDropdown, DatePicker, LabelFieldPair, CardLabel, BreakLine, TextInput } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const CONFIG = {
    fundName: {
    label: "---choose---",
    type: "dropdown",
    isMandatory: true,
    disable: false,
    populators: {
      name: "fundName",
      optionsKey: "label",
      optionsCustomStyle: { top: "2.3rem" },
      options: [
        { code: "mnc", label: "Municipal Fund" },
        { code: "a", label: "A" },
        { code: "b", label: "B" },
      ],
      styles: { width: "100%" },
    },
  },

  	expenditureType: {
    label: "---choose---",
    type: "dropdown",
    isMandatory: true,
    disable: false,
    populators: {
      name: "expenditureType",
      optionsKey: "label",
      optionsCustomStyle: { top: "2.3rem" },
      options: [
        { code: "mnc", label: "Purchase" },
        { code: "a", label: "Payment" },
        { code: "b", label: "Journal Voucher" },
      ],
      styles: { width: "100%" },
    },
  },

 



  billType: {
    label: "---choose---",
    type: "dropdown",
    isMandatory: true,
    disable: false,
    populators: {
      name: "billType",
      optionsKey: "label",
      optionsCustomStyle: { top: "2.3rem" },
      options: [
        { code: "sbi", label: "Final Bill" },
        { code: "hdfc", label: "First Bill" },
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
  fundName: null,
  expenditureType: null,
  voucherNumber: null,
  fromDate: null,
  toDate: null,
  billType: null,
  department: null,
  billNumber : null,
};

const FormField = ({ label, isMandatory = false, children }) => (
  <LabelFieldPair style={{ alignItems: "flex-start" }}>
    <CardLabel>
      {label} {isMandatory && <span style={{ color: "red" }}>*</span>}
    </CardLabel>
    {children}
  </LabelFieldPair>
);

const BillRegisterReportSearchform = ({ onSubmit, onReset }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const showToastMessage = useCallback((message, isError = false) => {
    setShowToast({ label: message, isError });
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.expenditureType || !formData.voucherNumber || !formData.department) {
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

      {showToast && <Toast label={showToast.label} error={showToast.isError} isDleteBtn={true} onClose={() => setShowToast(null)} />}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          "@media (maxWidth: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        {/* Left Column */}
        <div>
          <FormField label="Fund:" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.fundName.populators}
              onChange={(e) => setFormData({ ...formData, fundName: e })}
              value={formData.fundName}
            />
          </FormField>
          
               <FormField label="From Date:">
            <DatePicker
              date={formData.fromDate}
              onChange={(date) => setFormData({ ...formData, fromDate: date })}
              placeholder="(dd/mm/yyyy)"
              style={{ width: "60%" }}
            />
          </FormField>

          <FormField label="Expenditure Type:" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.expenditureType.populators}
              onChange={(e) => setFormData({ ...formData, expenditureType: e })}
              value={formData.expenditureType}
            />
          </FormField>

          <FormField label="Voucher Number" isMandatory>
              <TextInput
                            value={formData.voucherNumber}
                            onChange={(e) => setFormData({ ...formData, voucherNumber: e.target.value })}
                            style={{ width: "100%" }}
                          />
          </FormField>

     
         
        </div>

        {/* Right Column */}
        <div>
          <FormField label="Department" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.department.populators}
              onChange={(e) => setFormData({ ...formData, department: e })}
              value={formData.department}
            />
          </FormField>
            <FormField label="To Date:">
            <DatePicker
              date={formData.toDate}
              onChange={(date) => setFormData({ ...formData, toDate: date })}
              placeholder="(dd/mm/yyyy)"
              style={{ width: "60%" }}
            />
          </FormField>

          <FormField label="Bill Type" isMandatory>
            <CustomDropdown
              t={t}
              config={CONFIG.billType.populators}
              onChange={(e) => setFormData({ ...formData, billType: e })}
              value={formData.billType}
            />
          </FormField>

           <FormField label="Bill Number" isMandatory>
              <TextInput
                            value={formData.billNumber}
                            onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
                            style={{ width: "100%" }}
                          />
          </FormField>

        
        </div>
      </div>

      <BreakLine style={{ height: "0.01rem", margin: "20px 0" }} />

      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <Button label="Submit" variation="primary" onClick={handleSubmit} />
        <Button label="Reset" variation="secondary" onClick={handleReset} />
        <Button label="Close" variation="secondary" onClick={handleReset} />
      </div>
    </Card>
  );
};

export default BillRegisterReportSearchform;
