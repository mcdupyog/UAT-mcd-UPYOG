
import React, { useState, useReducer, useMemo, useRef, useEffect } from "react"
import {
  Card,
  CustomDropdown,
  Button,
  ActionBar,
  SubmitBar,
  Table,
  TextInput,
  LabelFieldPair,
  CardLabel,
  TextArea,
  Header,
  Toast,
  DeleteIconv2,
  FileUploadModal,
  BreakLine,
  UploadIcon,
  DatePicker,
  RadioButtons,
} from "@egovernments/digit-ui-react-components"
import { useTranslation } from "react-i18next"

// Configurations for dropdowns
const fundConfig = { label: "FUND", type: "dropdown", isMandatory: true, disable: false, populators: { name: "fund", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "general", label: "General Fund" }, { code: "special", label: "Special Fund" }, { code: "reserve", label: "Reserve Fund" }], styles: { width: "100%" } } }
const schemeConfig = { label: "SCHEME", type: "dropdown", isMandatory: false, disable: false, populators: { name: "scheme", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "urban", label: "Urban Development Scheme" }, { code: "rural", label: "Rural Development Scheme" }, { code: "infra", label: "Infrastructure Scheme" }], styles: { width: "100%" } } }
const subSchemeConfig = { label: "SUB_SCHEME", type: "dropdown", isMandatory: false, disable: false, populators: { name: "subScheme", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "road", label: "Road Development" }, { code: "water", label: "Water Supply" }, { code: "sanitation", label: "Sanitation" }], styles: { width: "100%" } } }
const fundSourceConfig = { label: "FUND_SOURCE", type: "dropdown", isMandatory: false, disable: false, populators: { name: "fundSource", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "state", label: "State Government" }, { code: "central", label: "Central Government" }, { code: "local", label: "Local Body" }], styles: { width: "100%" } } }
const departmentConfig = { label: "DEPARTMENT", type: "dropdown", isMandatory: true, disable: false, populators: { name: "department", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "law", label: "Law Department" }], styles: { width: "100%" } } }
const functionConfig = { label: "FUNCTION", type: "dropdown", isMandatory: false, disable: false, populators: { name: "function", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "admin", label: "Administration" }, { code: "development", label: "Development" }, { code: "maintenance", label: "Maintenance" }], styles: { width: "100%" } } }
const bankConfig = { label: "BANK", type: "dropdown", isMandatory: true, disable: false, populators: { name: "bank", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "bank1", label: "Bank 1" }, { code: "bank2", label: "Bank 2" }], styles: { width: "100%" } } }
const accountNumberConfig = { label: "ACCOUNT_NUMBER", type: "dropdown", isMandatory: true, disable: false, populators: { name: "accountNumber", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "account1", label: "Account 1" }, { code: "account2", label: "Account 2" }], styles: { width: "100%" } } }
const approverDepartmentConfig = { label: "APPROVER_DEPARTMENT", type: "dropdown", isMandatory: false, disable: false, populators: { name: "approverDepartment", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "finance", label: "Finance Department" }, { code: "admin", label: "Administration Department" }], styles: { width: "100%" } } }
const approverDesignationConfig = { label: "APPROVER_DESIGNATION", type: "dropdown", isMandatory: false, disable: false, populators: { name: "approverDesignation", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "manager", label: "Manager" }, { code: "director", label: "Director" }], styles: { width: "100%" } } }
const approverConfig = { label: "APPROVER", type: "dropdown", isMandatory: false, disable: false, populators: { name: "approver", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "------Choose-------" }, { code: "person1", label: "Person 1" }, { code: "person2", label: "Person 2" }], styles: { width: "100%" } } }
const subLedgerTypeConfig = { label: "TYPE", type: "dropdown", isMandatory: false, disable: false, populators: { name: "type", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "--- Select ---" }, { code: "contractor", label: "Contractor" }, { code: "supplier", label: "Supplier" }], styles: { width: "100%" } } }
const subLedgerCodeConfig = { label: "CODE", type: "dropdown", isMandatory: false, disable: false, populators: { name: "code", optionsKey: "label", optionsCustomStyle: { top: "2.3rem" }, options: [{ code: "choose", label: "--- Select ---" }, { code: "code1", label: "Code 1" }, { code: "code2", label: "Code 2" }], styles: { width: "100%" } } }
const accountCodeConfig = { 
  label: "ACCOUNT_CODE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "accountCode",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "choose", label: "------Choose-------" },
      { code: "1001", label: "1001 - Cash in Hand" },
      { code: "1002", label: "1002 - Bank Account" },
      { code: "2001", label: "2001 - Accounts Payable" },
      { code: "3001", label: "3001 - Revenue Account" },
    ],
    styles: { width: "100%" },
  },
}

// Reducer for account details
const accountDetailsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { id: Date.now(), functionName: "", accountCode: "", accountHead: "", debitAmount: "", creditAmount: "" }]
    case "UPDATE_ROW":
      return state.map((row) => (row.id === action.state.id ? { ...row, [action.state.type]: action.state.value || "" } : row))
    case "DELETE_ROW":
      return state.length > 1 ? state.filter((row) => row.id !== action.state.row.original.id) : state
    case "CLEAR_STATE":
      return [{ id: 1, functionName: "", accountCode: "", accountHead: "", debitAmount: "", creditAmount: "" }]
    default:
      return state
  }
}

// Reducer for sub-ledger details
const subLedgerReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { id: Date.now(), accountCode: "", type: "", code: "", name: "", amount: "" }]
    case "UPDATE_ROW":
      return state.map((row) => (row.id === action.state.id ? { ...row, [action.state.type]: action.state.value || "" } : row))
    case "DELETE_ROW":
      return state.length > 1 ? state.filter((row) => row.id !== action.state.row.original.id) : state
    case "CLEAR_STATE":
      return [{ id: 1, accountCode: "", type: "", code: "", name: "", amount: "" }]
    default:
      return state
  }
}

const CreateDirectBankPayment = () => {
  const { t } = useTranslation()
  const [showToast, setShowToast] = useState(null)
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false)
  const inputRef = useRef(null)
  const toastTimeoutRef = useRef(null)

  // Form state with initial values set to current date
  const [formData, setFormData] = useState({
    voucherDate: "11/07/2025",
    fund: null,
    scheme: null,
    subScheme: null,
    fundSource: null,
    department: null,
    function: null,
    bank: null,
    amount: "",
    accountNumber: null,
    balance: "0.00",
    modeOfPayment: "cheque",
    paidTo: "",
    documentNumber: "",
    documentDate: "11/07/2025",
    narration: "",
  })

  // Approval state
  const [approvalData, setApprovalData] = useState({
    approverDepartment: null,
    approverDesignation: null,
    approver: null,
    approverRemarks: "",
  })

  // Account details state
  const [accountDetails, dispatchAccountDetails] = useReducer(accountDetailsReducer, [{ id: 1, functionName: "", accountCode: "", accountHead: "", debitAmount: "", creditAmount: "" }])

  // Sub-ledger details state
  const [subLedgerDetails, dispatchSubLedger] = useReducer(subLedgerReducer, [{ id: 1, accountCode: "", type: "", code: "", name: "", amount: "" }])

  // Calculate totals
  const totalDebit = useMemo(() => accountDetails.reduce((sum, row) => sum + (Number.parseFloat(row.debitAmount) || 0), 0).toFixed(2), [accountDetails])
  const totalCredit = useMemo(() => accountDetails.reduce((sum, row) => sum + (Number.parseFloat(row.creditAmount) || 0), 0).toFixed(2), [accountDetails])
  const totalSubLedgerAmount = useMemo(() => subLedgerDetails.reduce((sum, row) => sum + (Number.parseFloat(row.amount) || 0), 0).toFixed(2), [subLedgerDetails])

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    }
  }, [])

  const handleDeleteAccountRow = ({ row }) => {
    if (accountDetails.length > 1) {
      dispatchAccountDetails({ type: "DELETE_ROW", state: { row } })
    } else {
      setShowToast({ label: "At least one row must remain in Account Details", isError: true })
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = setTimeout(() => setShowToast(null), 5000)
    }
  }

  const handleDeleteSubLedgerRow = ({ row }) => {
    if (subLedgerDetails.length > 1) {
      dispatchSubLedger({ type: "DELETE_ROW", state: { row } })
    } else {
      setShowToast({ label: "At least one row must remain in Sub-Ledger Details", isError: true })
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
      toastTimeoutRef.current = setTimeout(() => setShowToast(null), 5000)
    }
  }

  // Account Details columns
  const accountColumns = useMemo(
    () => [
      { Header: "Function Name", accessor: "functionName", Cell: ({ row }) => <TextInput value={accountDetails[row.index]?.functionName || ""} onChange={(e) => dispatchAccountDetails({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "functionName" } })} style={{ width: "90%", marginLeft: "2%" }} /> },
      { Header: "Account Code", accessor: "accountCode", Cell: ({ row }) => <TextInput value={accountDetails[row.index]?.accountCode || ""} onChange={(e) => dispatchAccountDetails({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "accountCode" } })} style={{ width: "90%", marginLeft: "2%" }} /> },
      { Header: "Account Head", accessor: "accountHead", Cell: ({ row }) => <TextInput value={accountDetails[row.index]?.accountHead || ""} onChange={(e) => dispatchAccountDetails({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "accountHead" } })} style={{ width: "90%", marginLeft: "2%" }} /> },
      { Header: "Debit Amount", accessor: "debitAmount", Cell: ({ row }) => <TextInput value={accountDetails[row.index]?.debitAmount || ""} onChange={(e) => dispatchAccountDetails({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "debitAmount" } })} style={{ width: "90%", marginLeft: "2%" }} /> },
      { Header: "Credit Amount", accessor: "creditAmount", Cell: ({ row }) => <TextInput value={accountDetails[row.index]?.creditAmount || ""} onChange={(e) => dispatchAccountDetails({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "creditAmount" } })} style={{ width: "90%", marginLeft: "2%" }} /> },
      { Header: "Add", Cell: () => <span onClick={() => dispatchAccountDetails({ type: "ADD_ROW" })} style={{ cursor: "pointer", color: "#00703C" }}>➕</span> },
      { Header: "Delete", Cell: ({ row }) => <span onClick={() => handleDeleteAccountRow({ row })}><DeleteIconv2 fill="#F47738" /></span> },
    ],
    [accountDetails],
  )

  // Sub-ledger columns
  const subLedgerColumns = useMemo(
    () => [
      { Header: "Account Code", accessor: "accountCode", Cell: ({ row }) => <CustomDropdown t={t} config={accountCodeConfig.populators} value={subLedgerDetails[row.index]?.accountCode} onChange={(e) => dispatchSubLedger({ type: "UPDATE_ROW", state: { id: row.original.id, value: e?.code || "", type: "accountCode" } })} /> },
      { Header: "Type", accessor: "type", Cell: ({ row }) => <CustomDropdown t={t} config={subLedgerTypeConfig.populators} value={subLedgerDetails[row.index]?.type} onChange={(e) => dispatchSubLedger({ type: "UPDATE_ROW", state: { id: row.original.id, value: e?.code || "", type: "type" } })} /> },
      { Header: <span>Code <span style={{ color: "red" }}>*</span></span>, accessor: "code", Cell: ({ row }) => <TextInput value={subLedgerDetails[row.index]?.code || ""} onChange={(e) => dispatchSubLedger({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "code" } })} style={{ width: "100px" }} /> },
      { Header: "Name", accessor: "name", Cell: ({ row }) => <TextInput value={subLedgerDetails[row.index]?.name || ""} onChange={(e) => dispatchSubLedger({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "name" } })} style={{ width: "120px" }} /> },
      { Header: "Amount", accessor: "amount", Cell: ({ row }) => <TextInput value={subLedgerDetails[row.index]?.amount || ""} onChange={(e) => dispatchSubLedger({ type: "UPDATE_ROW", state: { id: row.original.id, value: e.target.value, type: "amount" } })} style={{ width: "100px" }} /> },
      { Header: "Add", Cell: () => <span onClick={() => dispatchSubLedger({ type: "ADD_ROW" })} style={{ cursor: "pointer", color: "#00703C" }}>➕</span> },
      { Header: "Delete", Cell: ({ row }) => <span onClick={() => handleDeleteSubLedgerRow({ row })}><DeleteIconv2 fill="#F47738" /></span> },
    ],
    [subLedgerDetails],
  )

  const closeToast = () => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current)
    toastTimeoutRef.current = setTimeout(() => setShowToast(null), 5000)
  }

  const handleSubmit = () => {
    const mandatoryFields = ["voucherDate", "fund", "department", "bank", "amount", "accountNumber", "modeOfPayment", "paidTo", "documentNumber", "documentDate"]
    for (const field of mandatoryFields) {
      if (!formData[field] || (typeof formData[field] === "string" && !formData[field].trim())) {
        setShowToast({ label: `${field.replace(/([A-Z])/g, ' $1').trim()} is required`, isError: true })
        closeToast()
        return
      }
      if (field === "amount" && (isNaN(parseFloat(formData[field])) || parseFloat(formData[field]) < 0)) {
        setShowToast({ label: "Amount must be a valid positive number", isError: true })
        closeToast()
        return
      }
    }
    const voucherDateObj = new Date(formData.voucherDate.split("/").reverse().join("-"))
    const documentDateObj = new Date(formData.documentDate.split("/").reverse().join("-"))
    if (documentDateObj > voucherDateObj) {
      setShowToast({ label: "Document Date cannot exceed Voucher Date", isError: true })
      closeToast()
      return
    }
    if (parseFloat(totalDebit) !== parseFloat(totalCredit)) {
      setShowToast({ label: "Debit and Credit amounts must match", isError: true })
      closeToast()
      return
    }
    setShowToast({ label: "Create Direct Bank Payment saved successfully", isError: false })
    closeToast()
  }

  const handleBulkUpload = () => setShowBulkUploadModal(true)
  const onBulkUploadModalSubmit = async (file) => {
    try {
      if (!file || !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
        throw new Error("Please upload an Excel file (.xlsx or .xls)")
      }
      setShowToast({ label: "Bulk upload completed successfully", isError: false })
      setShowBulkUploadModal(false)
      closeToast()
    } catch (error) {
      setShowToast({ label: error.message || "Invalid file type. Please upload an Excel file.", isError: true })
      setShowBulkUploadModal(false)
      closeToast()
    }
  }
  const fileValidator = () => {
    setShowToast({ isError: true, label: "Please upload a valid Excel file" })
    setShowBulkUploadModal(false)
    closeToast()
  }

  const handleModeOfPaymentChange = (value) => setFormData((prev) => ({ ...prev, modeOfPayment: value || "cheque" }))

  const handleClear = () => {
    dispatchAccountDetails({ type: "CLEAR_STATE" })
    dispatchSubLedger({ type: "CLEAR_STATE" })
    setFormData({
      voucherDate: "11/07/2025",
      fund: null,
      scheme: null,
      subScheme: null,
      fundSource: null,
      department: null,
      function: null,
      bank: null,
      amount: "",
      accountNumber: null,
      balance: "0.00",
      modeOfPayment: "cheque",
      paidTo: "",
      documentNumber: "",
      documentDate: "11/07/2025",
      narration: "",
    })
    setApprovalData({ approverDepartment: null, approverDesignation: null, approver: null, approverRemarks: "" })
  }

  return (
    <React.Fragment>
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
          <h1>📊 Create Direct Bank Payment</h1>
        </div>
      </div>

      {showBulkUploadModal && (
        <FileUploadModal
          heading="Bulk Upload"
          cancelLabel="Cancel"
          submitLabel="Submit"
          onSubmit={onBulkUploadModalSubmit}
          onClose={() => setShowBulkUploadModal(false)}
          t={t}
          fileValidator={fileValidator}
        />
      )}
      {showToast && <Toast label={showToast.label} error={showToast?.isError} isDleteBtn={true} onClose={() => { setShowToast(null); if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current) }} />}

      <Card>
        <div style={{ display: "grid", padding: "10px 10% 10px", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "20px" }}>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel style={{ marginBottom: "0.4rem" }}>
              Voucher Date <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <DatePicker value={formData.voucherDate} onChange={(e) => setFormData({ ...formData, voucherDate: e.target.value || "11/07/2025" })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Fund <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <CustomDropdown t={t} config={fundConfig.populators} value={formData.fund} onChange={(e) => setFormData({ ...formData, fund: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Scheme</CardLabel>
            <CustomDropdown t={t} config={schemeConfig.populators} value={formData.scheme} onChange={(e) => setFormData({ ...formData, scheme: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Sub Scheme</CardLabel>
            <CustomDropdown t={t} config={subSchemeConfig.populators} value={formData.subScheme} onChange={(e) => setFormData({ ...formData, subScheme: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Fund Source</CardLabel>
            <CustomDropdown t={t} config={fundSourceConfig.populators} value={formData.fundSource} onChange={(e) => setFormData({ ...formData, fundSource: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Department <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <CustomDropdown t={t} config={departmentConfig.populators} value={formData.department} onChange={(e) => setFormData({ ...formData, department: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Function</CardLabel>
            <CustomDropdown t={t} config={functionConfig.populators} value={formData.function} onChange={(e) => setFormData({ ...formData, function: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Bank <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <CustomDropdown t={t} config={bankConfig.populators} value={formData.bank} onChange={(e) => setFormData({ ...formData, bank: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Amount <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <TextInput value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value || "" })} style={{ width: "100%" }} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Account Number <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <CustomDropdown t={t} config={accountNumberConfig.populators} value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e || null })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Balance</CardLabel>
            <TextInput value={formData.balance} onChange={(e) => setFormData({ ...formData, balance: e.target.value || "0.00" })} style={{ width: "100%" }} disabled />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Mode Of Payment <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <div style={{ display: "flex", gap: "15px" }}>
              <RadioButtons
                options={[
                  { code: "cheque", name: "Cheque" },
                  { code: "rtgs", name: "RTGS" },
                ]}
                selectedOption={formData.modeOfPayment}
                onSelect={handleModeOfPaymentChange}
                optionKey="name"
                style={{ width: "100%" }}
              />
            </div>
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Paid To <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <TextInput value={formData.paidTo} onChange={(e) => setFormData({ ...formData, paidTo: e.target.value || "" })} style={{ width: "100%" }} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Document Number <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <TextInput value={formData.documentNumber} onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value || "" })} style={{ width: "100%" }} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>
              Document Date <span style={{ color: "red" }}>*</span>
            </CardLabel>
            <DatePicker value={formData.documentDate} onChange={(e) => setFormData({ ...formData, documentDate: e.target.value || "11/07/2025" })} />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Narration</CardLabel>
            <TextArea name="narration" value={formData.narration} onChange={(e) => setFormData({ ...formData, narration: e.target.value || "" })} style={{ width: "100%", height: "80px" }} isTextArea={true} />
          </LabelFieldPair>
        </div>
      </Card>

      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Account Details</CardLabel>
        {accountDetails.length > 0 && (
          <Table
            className="table"
            t={t}
            customTableWrapperClassName="dss-table-wrapper"
            disableSort={true}
            autoSort={false}
            data={accountDetails}
            totalRecords={accountDetails.length}
            columns={accountColumns}
            isPaginationRequired={false}
            manualPagination={false}
            getCellProps={(cellInfo) => ({ style: { padding: "10px 8px", fontSize: "14px", whiteSpace: "normal" } })}
          />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#4A5568",
            color: "white",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          <div>Total</div>
          <div></div>
          <div>{totalDebit}</div>
          <div>{totalCredit}</div>
          <div></div>
          <div></div>
        </div>
      </Card>

      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Sub-Ledger Details</CardLabel>
        {subLedgerDetails.length > 0 && (
          <Table
            className="table"
            t={t}
            customTableWrapperClassName="dss-table-wrapper"
            disableSort={true}
            autoSort={false}
            data={subLedgerDetails}
            totalRecords={subLedgerDetails.length}
            columns={subLedgerColumns}
            isPaginationRequired={false}
            manualPagination={false}
            getCellProps={(cellInfo) => ({ style: { padding: "10px 8px", fontSize: "14px", whiteSpace: "normal" } })}
          />
        )}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "10px",
            padding: "10px",
            backgroundColor: "#4A5568",
            color: "white",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          <div>Total Amount</div>
          <div></div>
          <div></div>
          <div></div>
          <div>{totalSubLedgerAmount}</div>
          <div></div>
        </div>
      </Card>

      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>Approval Details</CardLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Approver Department</CardLabel>
            <CustomDropdown
              t={t}
              config={approverDepartmentConfig.populators}
              value={approvalData.approverDepartment}
              onChange={(e) => setApprovalData({ ...approvalData, approverDepartment: e || null })}
            />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Approver Designation</CardLabel>
            <CustomDropdown
              t={t}
              config={approverDesignationConfig.populators}
              value={approvalData.approverDesignation}
              onChange={(e) => setApprovalData({ ...approvalData, approverDesignation: e || null })}
            />
          </LabelFieldPair>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel>Approver</CardLabel>
            <CustomDropdown
              t={t}
              config={approverConfig.populators}
              value={approvalData.approver}
              onChange={(e) => setApprovalData({ ...approvalData, approver: e || null })}
            />
          </LabelFieldPair>
        </div>
        <LabelFieldPair style={{ alignItems: "flex-start" }}>
          <CardLabel>Approver Remarks</CardLabel>
          <TextArea
            name="approverRemarks"
            value={approvalData.approverRemarks}
            onChange={(e) => setApprovalData({ ...approvalData, approverRemarks: e.target.value || "" })}
            style={{ width: "100%", height: "80px" }}
            isTextArea={true}
          />
        </LabelFieldPair>
        <BreakLine style={{ height: "0.01rem" }} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
         <ActionBar style={{ marginLeft: "4px", gap: "10px", display: "flex", justifyContent: "flex-end" }}>
  <SubmitBar label="Forward" onButtonClick={handleSubmit} style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }} />
  <SubmitBar label="Create and Approve" onButtonClick={handleSubmit} style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }} />
  <SubmitBar label="Close" onButtonClick={handleClear} style={{ backgroundColor: "#1E3A8A", color: "#FFFFFF" }} />
</ActionBar>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default CreateDirectBankPayment