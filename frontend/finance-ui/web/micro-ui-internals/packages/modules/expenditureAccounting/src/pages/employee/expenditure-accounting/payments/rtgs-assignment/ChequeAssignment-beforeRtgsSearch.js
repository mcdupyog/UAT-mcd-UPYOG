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
  RadioButtons,
} from "@egovernments/digit-ui-react-components"
import { useTranslation } from "react-i18next"

// Configuration for dropdowns
const billTypeConfig = {
  label: "BILL_TYPE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "billType",
    optionsKey: "label",
    options: [
      { code: "choose", label: "------Choose-------" },
      { code: "regular", label: "Regular" },
      { code: "urgent", label: "Urgent" },
    ],
    styles: { width: "250px" },
  },
}

const fundConfig = {
  label: "FUND",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "fund",
    optionsKey: "label",
    options: [
      { code: "choose", label: "------Choose-------" },
      { code: "general", label: "General Fund" },
      { code: "special", label: "Special Fund" },
      { code: "reserve", label: "Reserve Fund" },
    ],
    styles: { width: "250px" },
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
      { code: "choose", label: "------Choose-------" },
      { code: "law", label: "Law Department" },
    ],
    styles: { width: "250px" },
  },
}

const payeeBankBranchConfig = {
  label: "PAYEE_BANK_BRANCH",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "payeeBankBranch",
    optionsKey: "label",
    options: [
      { code: "choose", label: "------Choose-------" },
      { code: "branch1", label: "Bank Branch 1" },
      { code: "branch2", label: "Bank Branch 2" },
    ],
    styles: { width: "250px" },
  },
}

const payeeBankAccountConfig = {
  label: "PAYEE_BANK_ACCOUNT",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "payeeBankAccount",
    optionsKey: "label",
    options: [
      { code: "choose", label: "------Choose-------" },
      { code: "account1", label: "Account 1" },
      { code: "account2", label: "Account 2" },
    ],
    styles: { width: "250px" },
  },
}

const RTGSRefNoAssignmentSearch = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    paymentVoucherDateFrom: "",
    paymentVoucherDateTo: "",
    modeOfPayment: "rtgs",
    paymentVoucherNo: "",
    billType: null,
    fund: null,
    department: null,
    payeeBankBranch: null,
    payeeBankAccount: null,
  })
  const [showToast, setShowToast] = useState(null)

  const closeToast = () => {
    setShowToast(null)
  }

  useEffect(() => {
    const today = new Date().toLocaleDateString("en-GB")
    if (!formData.paymentVoucherDateFrom) setFormData((prev) => ({ ...prev, paymentVoucherDateFrom: today }))
    if (!formData.paymentVoucherDateTo) setFormData((prev) => ({ ...prev, paymentVoucherDateTo: today }))
  }, [])

  const handleSearch = () => {
    if (formData.paymentVoucherDateFrom && formData.paymentVoucherDateTo) {
      const [dayFrom, monthFrom, yearFrom] = formData.paymentVoucherDateFrom.split("/")
      const [dayTo, monthTo, yearTo] = formData.paymentVoucherDateTo.split("/")
      const dateFrom = new Date(`${yearFrom}-${monthFrom}-${dayFrom}`)
      const dateTo = new Date(`${yearTo}-${monthTo}-${dayTo}`)
      if (dateFrom > dateTo) {
        setShowToast({ label: "Payment Voucher Date From cannot be greater than Payment Voucher Date To", isError: true })
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
      paymentVoucherDateFrom: "",
      paymentVoucherDateTo: "",
      modeOfPayment: "rtgs",
      paymentVoucherNo: "",
      billType: null,
      fund: null,
      department: null,
      payeeBankBranch: null,
      payeeBankAccount: null,
    })
    setShowToast({ label: "Form cleared", isError: false })
    closeToast()
  }

  const handleModeOfPaymentChange = (value) => {
    setFormData((prev) => ({ ...prev, modeOfPayment: value }))
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
          <h1>📊 RTGS Ref.No Assignment Search</h1>
        </div>
      </div>
      <Card style={{ padding: "25px", borderRadius: "4px",  margin: "20px auto", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "25px" }}>
          <LabelFieldPair>
            <CardLabel>Payment Voucher Date From</CardLabel>
            <TextInput
              value={formData.paymentVoucherDateFrom}
              onChange={(e) => setFormData({ ...formData, paymentVoucherDateFrom: e.target.value })}
              placeholder="DD/MM/YYYY"
              style={{ width: "250px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Payment Voucher Date From"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Payment Voucher Date To</CardLabel>
            <TextInput
              value={formData.paymentVoucherDateTo}
              onChange={(e) => setFormData({ ...formData, paymentVoucherDateTo: e.target.value })}
              placeholder="DD/MM/YYYY"
              style={{ width: "250px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Payment Voucher Date To"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Mode of Payment</CardLabel>
            <div style={{ display: "flex", gap: "15px", alignItems: "center", width: "250px" }}>
              <RadioButtons
                onSelect={handleModeOfPaymentChange}
                selected={formData.modeOfPayment}
                optionsKey="code"
                options={[
                  { code: "rtgs", name: t("RTGS") || "RTGS" },
                ]}
                style={{ fontSize: "14px" }}
              />
            </div>
          </LabelFieldPair>
          <div></div>
          <LabelFieldPair>
            <CardLabel>Payment Voucher No.</CardLabel>
            <TextInput
              value={formData.paymentVoucherNo}
              onChange={(e) => setFormData({ ...formData, paymentVoucherNo: e.target.value })}
              style={{ width: "250px", padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Payment Voucher No."
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Bill Type</CardLabel>
            <CustomDropdown
              t={t}
              config={billTypeConfig.populators}
              onChange={(e) => setFormData({ ...formData, billType: e })}
              value={formData.billType}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Bill Type"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Fund</CardLabel>
            <CustomDropdown
              t={t}
              config={fundConfig.populators}
              onChange={(e) => setFormData({ ...formData, fund: e })}
              value={formData.fund}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Fund"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Department</CardLabel>
            <CustomDropdown
              t={t}
              config={departmentConfig.populators}
              onChange={(e) => setFormData({ ...formData, department: e })}
              value={formData.department}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Department"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Payee Bank-Branch</CardLabel>
            <CustomDropdown
              t={t}
              config={payeeBankBranchConfig.populators}
              onChange={(e) => setFormData({ ...formData, payeeBankBranch: e })}
              value={formData.payeeBankBranch}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Payee Bank-Branch"
            />
          </LabelFieldPair>
          <LabelFieldPair>
            <CardLabel>Payee Bank Account</CardLabel>
            <CustomDropdown
              t={t}
              config={payeeBankAccountConfig.populators}
              onChange={(e) => setFormData({ ...formData, payeeBankAccount: e })}
              value={formData.payeeBankAccount}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" }}
              aria-label="Payee Bank Account"
            />
          </LabelFieldPair>
        </div>
        <div style={{ textAlign: "center", marginTop: "25px" }}>
          <button
            type="button"
            onClick={handleSearch}
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              marginRight: "15px",
              cursor: "pointer",
              borderRadius: "4px",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
            aria-label="Search"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClose}
            style={{
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              padding: "10px 25px",
              cursor: "pointer",
              borderRadius: "4px",
              fontSize: "14px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
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

export default RTGSRefNoAssignmentSearch