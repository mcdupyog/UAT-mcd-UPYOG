import React, { useState, useEffect } from "react"
import {
  Card,
  CustomDropdown,
  TextInput,
  CardLabel,
  LabelFieldPair,
  SubmitBar,
  Header,
  Toast,
} from "@egovernments/digit-ui-react-components"
import { useTranslation } from "react-i18next"

// Configuration for dropdowns
const expenditureTypeConfig = {
  label: "EXPENDITURE_TYPE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "expenditureType",
    optionsKey: "label",
    options: [
      { code: "payment", label: "Payment" },
      { code: "refund", label: "Refund" },
      { code: "adjustment", label: "Adjustment" },
    ],
    styles: { width: "100%" },
  },
}

const fundConfig = {
  label: "FUND",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "fund",
    optionsKey: "label",
    options: [
      { code: "general", label: "General Fund" },
      { code: "special", label: "Special Fund" },
      { code: "reserve", label: "Reserve Fund" },
    ],
    styles: { width: "100%" },
  },
}

const fundSourceConfig = {
  label: "FUND_SOURCE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "fundSource",
    optionsKey: "label",
    options: [
      { code: "state", label: "State Government" },
      { code: "central", label: "Central Government" },
      { code: "local", label: "Local Body" },
    ],
    styles: { width: "100%" },
  },
}

const schemeConfig = {
  label: "SCHEME",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "scheme",
    optionsKey: "label",
    options: [
      { code: "urban", label: "Urban Development Scheme" },
      { code: "rural", label: "Rural Development Scheme" },
      { code: "infra", label: "Infrastructure Scheme" },
    ],
    styles: { width: "100%" },
  },
}

const subSchemeConfig = {
  label: "SUB_SCHEME",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "subScheme",
    optionsKey: "label",
    options: [
      { code: "road", label: "Road Development" },
      { code: "water", label: "Water Supply" },
      { code: "sanitation", label: "Sanitation" },
    ],
    styles: { width: "100%" },
  },
}

const departmentConfig = {
  label: "DEPARTMENT",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "department",
    optionsKey: "label",
    options: [
      { code: "finance", label: "Finance Department" },
      { code: "admin", label: "Administration Department" },
      { code: "engineering", label: "Engineering Department" },
    ],
    styles: { width: "100%" },
  },
}

const functionConfig = {
  label: "FUNCTION",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "function",
    optionsKey: "label",
    options: [
      { code: "admin", label: "Administration" },
      { code: "development", label: "Development" },
      { code: "maintenance", label: "Maintenance" },
    ],
    styles: { width: "100%" },
  },
}

const BillSearchPage = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    billNumber: "",
    billDateFrom: "",
    billDateTo: "",
    expenditureType: null,
    fund: null,
    fundSource: null,
    scheme: null,
    subScheme: null,
    department: null,
    function: null,
  })
  const [showToast, setShowToast] = useState(null)

  const closeToast = () => {
    setShowToast(null)
  }

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB")
    if (!formData.billDateFrom) setFormData((prev) => ({ ...prev, billDateFrom: today }))
    if (!formData.billDateTo) setFormData((prev) => ({ ...prev, billDateTo: today }))
  }, [])

  const handleSearch = () => {
    const mandatoryFields = [
      { key: "fund", label: "Fund" },
    ]
    for (const field of mandatoryFields) {
      if (!formData[field.key]) {
        setShowToast({ label: `${field.label} is required`, isError: true })
        closeToast()
        return
      }
    }
    if (formData.billDateFrom && formData.billDateTo) {
      const [dayFrom, monthFrom, yearFrom] = formData.billDateFrom.split("/")
      const [dayTo, monthTo, yearTo] = formData.billDateTo.split("/")
      const dateFrom = new Date(`${yearFrom}-${monthFrom}-${dayFrom}`)
      const dateTo = new Date(`${yearTo}-${monthTo}-${dayTo}`)
      if (dateFrom > dateTo) {
        setShowToast({ label: "Bill Date From cannot be greater than Bill Date To", isError: true })
        closeToast()
        return
      }
    }
    setShowToast({ label: "Search completed successfully", isError: false })
    closeToast()
    console.log("Search triggered with:", formData)
  }

  const handleClose = () => {
    setFormData({
      billNumber: "",
      billDateFrom: "",
      billDateTo: "",
      expenditureType: null,
      fund: null,
      fundSource: null,
      scheme: null,
      subScheme: null,
      department: null,
      function: null,
    })
    setShowToast({ label: "Form cleared", isError: false })
    closeToast()
  }

  return (
    <div>
      <div
        style={{
          fontFamily: "semibold",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#fff",
          background: "#34495E",
          borderLeft: "5px solid #337ab7",
          borderBottom: "1px solid #337ab7",
          textAlign: "left",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "8px 15px",
        }}
      >
        <div>
          <h1>📊 Bill Payment Search</h1>
        </div>
      </div>
      <Card style={{ padding: "20px", borderRadius: "4px",  margin: "20px auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "30px" }}>
          <LabelFieldPair>
            <CardLabel>Bill Number</CardLabel>
            <TextInput
              value={formData.billNumber}
              onChange={(e) => setFormData({ ...formData, billNumber: e.target.value })}
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Bill Number"
            />
          </LabelFieldPair>
          <div></div>
          <LabelFieldPair>
            <CardLabel>Bill Date From</CardLabel>
            <TextInput
              value={formData.billDateFrom}
              onChange={(e) => setFormData({ ...formData, billDateFrom: e.target.value })}
              placeholder="DD/MM/YYYY"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Bill Date From"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Bill Date To</CardLabel>
            <TextInput
              value={formData.billDateTo}
              onChange={(e) => setFormData({ ...formData, billDateTo: e.target.value })}
              placeholder="DD/MM/YYYY"
              style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Bill Date To"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Expenditure Type</CardLabel>
            <CustomDropdown
              t={t}
              config={expenditureTypeConfig.populators}
              onChange={(e) => setFormData({ ...formData, expenditureType: e })}
              value={formData.expenditureType}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Expenditure Type"
            />
          </LabelFieldPair>
          <div></div>
          <LabelFieldPair>
            <CardLabel>
              Fund <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <CustomDropdown
              t={t}
              config={fundConfig.populators}
              onChange={(e) => setFormData({ ...formData, fund: e })}
              value={formData.fund}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Fund"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Fund Source</CardLabel>
            <CustomDropdown
              t={t}
              config={fundSourceConfig.populators}
              onChange={(e) => setFormData({ ...formData, fundSource: e })}
              value={formData.fundSource}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Fund Source"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Scheme</CardLabel>
            <CustomDropdown
              t={t}
              config={schemeConfig.populators}
              onChange={(e) => setFormData({ ...formData, scheme: e })}
              value={formData.scheme}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Scheme"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Sub Scheme</CardLabel>
            <CustomDropdown
              t={t}
              config={subSchemeConfig.populators}
              onChange={(e) => setFormData({ ...formData, subScheme: e })}
              value={formData.subScheme}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Sub Scheme"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Department</CardLabel>
            <CustomDropdown
              t={t}
              config={departmentConfig.populators}
              onChange={(e) => setFormData({ ...formData, department: e })}
              value={formData.department}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Department"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Function</CardLabel>
            <CustomDropdown
              t={t}
              config={functionConfig.populators}
              onChange={(e) => setFormData({ ...formData, function: e })}
              value={formData.function}
              style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }}
              aria-label="Function"
            />
          </LabelFieldPair>
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="button"
            onClick={handleSearch}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              cursor: "pointer",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            aria-label="Search"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClose}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
              fontSize: "14px",
            }}
            aria-label="Close"
          >
            Close
          </button>
        </div>
        {showToast && <Toast label={showToast.label} isError={showToast.isError} onClose={closeToast} />}
      </Card>
    </div>
  )
}

export default BillSearchPage