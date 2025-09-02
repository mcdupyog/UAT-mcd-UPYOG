
import React, { useState, useReducer, useMemo, useRef } from "react";
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
} from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

// Configuration objects for dropdowns
const contractorConfig = {
  label: "CONTRACTOR",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "contractor",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "cont1", label: "ABC Construction" },
      { code: "cont2", label: "XYZ Builders" },
      { code: "cont3", label: "PQR Contractors" },
    ],
    styles: { width: "100%" },
  },
};

const workOrderConfig = {
  label: "WORK_ORDER",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "workOrder",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "wo1", label: "WO-2023-001" },
      { code: "wo2", label: "WO-2023-002" },
      { code: "wo3", label: "WO-2023-003" },
    ],
    styles: { width: "100%" },
  },
};

const zoneConfig = {
  label: "ZONE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "zone",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "zone1", label: "North Zone" },
      { code: "zone2", label: "South Zone" },
      { code: "zone3", label: "East Zone" },
    ],
    styles: { width: "100%" },
  },
};

const wardConfig = {
  label: "WARD",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "ward",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "ward1", label: "Ward 1" },
      { code: "ward2", label: "Ward 2" },
      { code: "ward3", label: "Ward 3" },
    ],
    styles: { width: "100%" },
  },
};

const divisionConfig = {
  label: "DIVISION",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "division",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "div1", label: "Division A" },
      { code: "div2", label: "Division B" },
      { code: "div3", label: "Division C" },
    ],
    styles: { width: "100%" },
  },
};

const fundConfig = {
  label: "FUND",
  type: "dropdown",
  isMandatory: true,
  disable: false,
  populators: {
    name: "fund",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "general", label: "General Fund" },
      { code: "special", label: "Special Fund" },
      { code: "reserve", label: "Reserve Fund" },
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

const schemeConfig = {
  label: "SCHEME",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "scheme",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "scheme1", label: "Urban Development Scheme" },
      { code: "scheme2", label: "Rural Development Scheme" },
      { code: "scheme3", label: "Infrastructure Scheme" },
    ],
    styles: { width: "100%" },
  },
};

const subSchemeConfig = {
  label: "SUB_SCHEME",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "subScheme",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "sub1", label: "Road Development" },
      { code: "sub2", label: "Water Supply" },
      { code: "sub3", label: "Sanitation" },
    ],
    styles: { width: "100%" },
  },
};

const billTypeConfig = {
  label: "BILL_TYPE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "billType",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "type1", label: "Final Bill" },
      { code: "type2", label: "Running Bill" },
      { code: "type3", label: "Supplementary Bill" },
    ],
    styles: { width: "100%" },
  },
};

const templateConfig = {
  label: "TEMPLATE",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "template",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "temp1", label: "Template 1" },
      { code: "temp2", label: "Template 2" },
      { code: "temp3", label: "Template 3" },
    ],
    styles: { width: "100%" },
  },
};

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
      { code: "1001", label: "1001 - Cash in Hand" },
      { code: "1002", label: "1002 - Bank Account" },
      { code: "2001", label: "2001 - Accounts Payable" },
      { code: "3001", label: "3001 - Revenue Account" },
    ],
    styles: { width: "100%" },
  },
};

const approverDepartmentConfig = {
  label: "APPROVER_DEPARTMENT",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "approverDepartment",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "finance", label: "Finance Department" },
      { code: "admin", label: "Administration Department" },
    ],
    styles: { width: "100%" },
  },
};

const approverDesignationConfig = {
  label: "APPROVER_DESIGNATION",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "approverDesignation",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "manager", label: "Manager" },
      { code: "director", label: "Director" },
      { code: "secretary", label: "Secretary" },
    ],
    styles: { width: "100%" },
  },
};

const approverConfig = {
  label: "APPROVER",
  type: "dropdown",
  isMandatory: false,
  disable: false,
  populators: {
    name: "approver",
    optionsKey: "label",
    optionsCustomStyle: { top: "2.3rem" },
    options: [
      { code: "john_doe", label: "John Doe" },
      { code: "jane_smith", label: "Jane Smith" },
      { code: "mike_johnson", label: "Mike Johnson" },
    ],
    styles: { width: "100%" },
  },
};

// Reducers for different sections
const debitDetailsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [
        ...state,
        {
          id: Date.now(),
          accountCode: "",
          accountHead: "",
          debitAmount: "",
        },
      ];
    case "UPDATE_ROW":
      return state.map((row) =>
        row.id === action.state.id ? { ...row, [action.state.type]: action.state.value } : row
      );
    case "DELETE_ROW":
      return state.filter((row) => row.id !== action.state.row.original.id);
    case "CLEAR_STATE":
      return [{ id: 1, accountCode: "", accountHead: "", debitAmount: "" }];
    default:
      return state;
  }
};

const deductionDetailsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [
        ...state,
        {
          id: Date.now(),
          accountCode: "",
          accountHead: "",
          deductionAmount: "",
        },
      ];
    case "UPDATE_ROW":
      return state.map((row) =>
        row.id === action.state.id ? { ...row, [action.state.type]: action.state.value } : row
      );
    case "DELETE_ROW":
      return state.filter((row) => row.id !== action.state.row.original.id);
    case "CLEAR_STATE":
      return [{ id: 1, accountCode: "", accountHead: "", deductionAmount: "" }];
    default:
      return state;
  }
};

const netPayableReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROW":
      return [
        ...state,
        {
          id: Date.now(),
          accountCode: "",
          creditAmount: "",
        },
      ];
    case "UPDATE_ROW":
      return state.map((row) =>
        row.id === action.state.id ? { ...row, [action.state.type]: action.state.value } : row
      );
    case "DELETE_ROW":
      return state.filter((row) => row.id !== action.state.row.original.id);
    case "CLEAR_STATE":
      return [{ id: 1, accountCode: "", creditAmount: "" }];
    default:
      return state;
  }
};

const initialDebitState = [{ id: 1, accountCode: "", accountHead: "", debitAmount: "" }];
const initialDeductionState = [{ id: 1, accountCode: "", accountHead: "", deductionAmount: "" }];
const initialNetPayableState = [{ id: 1, accountCode: "", creditAmount: "" }];

const SupplierNewform = () => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const inputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    billDate: "04/07/2025",
    contractor: null,
    workOrder: null,
    zone: null,
    ward: null,
    division: null,
    fund: null,
    department: null,
    scheme: null,
    subScheme: null,
    function: "",
    narration: "",
    partyBillNumber: "",
    partyBillDate: "",
    partyBillAmount: "",
    billType: null,
    template: null,
  });

  // Approval state
  const [approvalData, setApprovalData] = useState({
    approverDepartment: null,
    approverDesignation: null,
    approver: null,
    comments: "",
  });

  // State for different sections
  const [debitDetails, dispatchDebitDetails] = useReducer(debitDetailsReducer, initialDebitState);
  const [deductionDetails, dispatchDeductionDetails] = useReducer(deductionDetailsReducer, initialDeductionState);
  const [netPayable, dispatchNetPayable] = useReducer(netPayableReducer, initialNetPayableState);

  // Calculate totals
  const totalDebit = useMemo(() => {
    return debitDetails.reduce((sum, row) => {
      const amount = Number.parseFloat(row.debitAmount) || 0;
      return sum + amount;
    }, 0);
  }, [debitDetails]);

  const totalDeduction = useMemo(() => {
    return deductionDetails.reduce((sum, row) => {
      const amount = Number.parseFloat(row.deductionAmount) || 0;
      return sum + amount;
    }, 0);
  }, [deductionDetails]);

  const totalNetPayable = useMemo(() => {
    return netPayable.reduce((sum, row) => {
      const amount = Number.parseFloat(row.creditAmount) || 0;
      return sum + amount;
    }, 0);
  }, [netPayable]);

  // Row handlers
  const handleDeleteDebitRow = ({ row, val, col }) => {
    dispatchDebitDetails({
      type: "DELETE_ROW",
      state: { row },
    });
  };

  const handleDeleteDeductionRow = ({ row, val, col }) => {
    dispatchDeductionDetails({
      type: "DELETE_ROW",
      state: { row },
    });
  };

  const handleDeleteNetPayableRow = ({ row, val, col }) => {
    dispatchNetPayable({
      type: "DELETE_ROW",
      state: { row },
    });
  };

  // Column definitions with proper accessors
  const debitColumns = useMemo(
    () => [
      {
        Header: "Account Code",
        accessor: "accountCode",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="accountCode"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDebitDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "accountCode",
                  },
                });
              }}
              value={debitDetails[row.index]?.accountCode || ""}
              placeholder="Type first 3 letters of Account code"
              style={{ marginBottom: "0px" }}
              aria-label="Account Code"
            />
          );
        },
      },
      {
        Header: "Account Head",
        accessor: "accountHead",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="accountHead"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDebitDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "accountHead",
                  },
                });
              }}
              value={debitDetails[row.index]?.accountHead || ""}
              style={{ marginBottom: "0px" }}
              aria-label="Account Head"
            />
          );
        },
      },
      {
        Header: "Debit Amount",
        accessor: "debitAmount",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="debitAmount"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDebitDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "debitAmount",
                  },
                });
              }}
              value={debitDetails[row.index]?.debitAmount || ""}
              style={{ marginBottom: "0px" }}
              aria-label="Debit Amount"
            />
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => dispatchDebitDetails({ type: "ADD_ROW" })}
              className="icon-wrapper"
              style={{ cursor: "pointer", color: "#00703C", fontSize: "18px", background: "none", border: "none" }}
              aria-label="Add row"
            >
              +
            </button>
          );
        },
      },
      {
        Header: "",
        accessor: "delete",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => handleDeleteDebitRow({ row, value, col })}
              className="icon-wrapper"
              style={{ background: "none", border: "none" }}
              aria-label="Delete row"
            >
              <DeleteIconv2 fill={"#F47738"} />
            </button>
          );
        },
      },
    ],
    [debitDetails]
  );

  const deductionColumns = useMemo(
    () => [
      {
        Header: "Account Code",
        accessor: "accountCode",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="accountCode"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDeductionDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "accountCode",
                  },
                });
              }}
              value={deductionDetails[row.index]?.accountCode || ""}
              placeholder="Type first 3 letters of Account code"
              style={{ marginBottom: "0px" }}
              aria-label="Account Code"
            />
          );
        },
      },
      {
        Header: "Account Head",
        accessor: "accountHead",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="accountHead"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDeductionDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "accountHead",
                  },
                });
              }}
              value={deductionDetails[row.index]?.accountHead || ""}
              style={{ marginBottom: "0px" }}
              aria-label="Account Head"
            />
          );
        },
      },
      {
        Header: "Deduction Amount",
        accessor: "deductionAmount",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="deductionAmount"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchDeductionDetails({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "deductionAmount",
                  },
                });
              }}
              value={deductionDetails[row.index]?.deductionAmount || ""}
              style={{ marginBottom: "0px" }}
              aria-label="Deduction Amount"
            />
          );
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => dispatchDeductionDetails({ type: "ADD_ROW" })}
              className="icon-wrapper"
              style={{ cursor: "pointer", color: "#00703C", fontSize: "18px", background: "none", border: "none" }}
              aria-label="Add row"
            >
              +
            </button>
          );
        },
      },
      {
        Header: "",
        accessor: "delete",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => handleDeleteDeductionRow({ row, value, col })}
              className="icon-wrapper"
              style={{ background: "none", border: "none" }}
              aria-label="Delete row"
            >
              <DeleteIconv2 fill={"#F47738"} />
            </button>
          );
        },
      },
    ],
    [deductionDetails]
  );

  const netPayableColumns = useMemo(
    () => [
      {
        Header: "Account Code",
        accessor: "accountCode",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <div style={{ width: "150px" }}>
              <CustomDropdown
                t={t}
                config={accountCodeConfig.populators}
                onChange={(e) => {
                  dispatchNetPayable({
                    type: "UPDATE_ROW",
                    state: {
                      id: row.original.id,
                      value: e?.code || "",
                      type: "accountCode",
                    },
                  });
                }}
                value={netPayable[row.index]?.accountCode}
              />
            </div>
          );
        },
      },
      {
        Header: "Credit Amount",
        accessor: "creditAmount",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <TextInput
              name="creditAmount"
              className={"field"}
              textInputStyle={{ width: "90%", marginLeft: "2%" }}
              onChange={(e) => {
                dispatchNetPayable({
                  type: "UPDATE_ROW",
                  state: {
                    id: row.original.id,
                    value: e.target.value,
                    type: "creditAmount",
                  },
                });
              }}
              value={netPayable[row.index]?.creditAmount || ""}
              style={{ marginBottom: "0px" }}
              aria-label="Credit Amount"
            />
          );
        },
      },
      {
        Header: "Select",
        accessor: "select",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => dispatchNetPayable({ type: "ADD_ROW" })}
              className="icon-wrapper"
              style={{ cursor: "pointer", color: "#00703C", fontSize: "18px", background: "none", border: "none" }}
              aria-label="Add row"
            >
              +
            </button>
          );
        },
      },
      {
        Header: "",
        accessor: "delete",
        Cell: ({ value, col, row, ...rest }) => {
          return (
            <button
              onClick={() => handleDeleteNetPayableRow({ row, value, col })}
              className="icon-wrapper"
              style={{ background: "none", border: "none" }}
              aria-label="Delete row"
            >
              <DeleteIconv2 fill={"#F47738"} />
            </button>
          );
        },
      },
    ],
    [netPayable, t]
  );

  // Toast handling
  const closeToast = () => {
    setTimeout(() => {
      setShowToast(null);
    }, 5000);
  };

  const handleSubmit = () => {
    if (totalDebit !== (totalDeduction + totalNetPayable)) {
      setShowToast({
        label: "Debit amount must equal the sum of Deduction and Net Payable amounts",
        isError: true,
      });
      closeToast();
      return;
    }

    setShowToast({
      label: "Payment Voucher saved successfully",
      isError: false,
    });
    closeToast();
  };

  const handleBulkUpload = () => {
    setShowBulkUploadModal(true);
  };

  const onBulkUploadModalSubmit = async (file) => {
    try {
      setShowToast({
        label: "Bulk upload completed successfully",
        isError: false,
      });
      setShowBulkUploadModal(false);
      closeToast();
    } catch (error) {
      setShowToast({
        label: error.message || "Invalid file type. Please upload an Excel file.",
        isError: true,
      });
      setShowBulkUploadModal(false);
      closeToast();
    }
  };

  const fileValidator = (errMsg) => {
    setShowToast({
      isError: true,
      label: "Please upload a valid Excel file",
    });
    closeToast();
    setShowBulkUploadModal(false);
  };

  return (
    <React.Fragment>
      {/* Header Section */}  
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
          <h1 style={{ margin: 0 }}>📊 Supplier Bill</h1>
        </div>
      </div>

      {/* Toast and Modals */}
      {showBulkUploadModal && (
        <FileUploadModal
          heading={"Bulk Upload"}
          cancelLabel={"Cancel"}
          submitLabel={"Submit"}
          onSubmit={onBulkUploadModalSubmit}
          onClose={() => setShowBulkUploadModal(false)}
          t={t}
          fileValidator={fileValidator}
        />
      )}

      {showToast && (
        <Toast
          label={showToast.label}
          error={showToast?.isError}
          isDleteBtn={true}
          onClose={() => setShowToast(null)}
        />
      )}

      {/* Summary Card */}
      <Card>
     <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: "16px",
      marginBottom: "20px",
      padding: "15px",
      background: "#f8f9fa",
      borderRadius: "4px",
      border: "1px solid #dee2e6"
    }}>
      
          <div >
            <strong>Net Payable Amount:</strong> 
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#00703C" }}> ₹ {totalNetPayable.toFixed(2)}</span>
          </div>
          <div>
            <strong>Total Debit Amount:</strong>
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#00703C" }}>  ₹ {totalDebit.toFixed(2)}</span>
          </div>
          <div>
            <strong>Total Deduction Amount:</strong> 
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#00703C" }}> ₹ {totalDeduction.toFixed(2)}</span>
          </div>
          <div>
            <strong>Total Budget Amount:</strong> 
            <span style={{ fontSize: "18px", fontWeight: "bold", color: "#00703C" }}> ₹ 0.00</span>
          </div>
        </div>
      </Card>

      {/* Main Form */}
      <Card>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          {/* Column 1 */}
          <div>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                <span id="billDateLabel">Bill Date</span> <span style={{ color: "red" }}>*</span>
              </CardLabel>
              <DatePicker 
                date={formData.billDate} 
                onChange={(date) => setFormData({ ...formData, billDate: date })} 
                style={{ width: "100%" }}
                aria-labelledby="billDateLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="contractorLabel">Contractor</CardLabel>
              <CustomDropdown
                t={t}
                config={contractorConfig.populators}
                onChange={(e) => setFormData({ ...formData, contractor: e })}
                value={formData.contractor}
                aria-labelledby="contractorLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="workOrderLabel">Work Order</CardLabel>
              <CustomDropdown
                t={t}
                config={workOrderConfig.populators}
                onChange={(e) => setFormData({ ...formData, workOrder: e })}
                value={formData.workOrder}
                aria-labelledby="workOrderLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="zoneLabel">Zone</CardLabel>
              <CustomDropdown
                t={t}
                config={zoneConfig.populators}
                onChange={(e) => setFormData({ ...formData, zone: e })}
                value={formData.zone}
                aria-labelledby="zoneLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="wardLabel">Ward</CardLabel>
              <CustomDropdown
                t={t}
                config={wardConfig.populators}
                onChange={(e) => setFormData({ ...formData, ward: e })}
                value={formData.ward}
                aria-labelledby="wardLabel"
              />
            </LabelFieldPair>
          </div>

          {/* Column 2 */}
          <div>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="divisionLabel">Division</CardLabel>
              <CustomDropdown
                t={t}
                config={divisionConfig.populators}
                onChange={(e) => setFormData({ ...formData, division: e })}
                value={formData.division}
                aria-labelledby="divisionLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                <span id="fundLabel">Fund</span> <span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={fundConfig.populators}
                onChange={(e) => setFormData({ ...formData, fund: e })}
                value={formData.fund}
                aria-labelledby="fundLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel>
                <span id="departmentLabel">Department</span> <span style={{ color: "red" }}>*</span>
              </CardLabel>
              <CustomDropdown
                t={t}
                config={departmentConfig.populators}
                onChange={(e) => setFormData({ ...formData, department: e })}
                value={formData.department}
                aria-labelledby="departmentLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="schemeLabel">Scheme</CardLabel>
              <CustomDropdown
                t={t}
                config={schemeConfig.populators}
                onChange={(e) => setFormData({ ...formData, scheme: e })}
                value={formData.scheme}
                aria-labelledby="schemeLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="subSchemeLabel">Sub Scheme</CardLabel>
              <CustomDropdown
                t={t}
                config={subSchemeConfig.populators}
                onChange={(e) => setFormData({ ...formData, subScheme: e })}
                value={formData.subScheme}
                aria-labelledby="subSchemeLabel"
              />
            </LabelFieldPair>
          </div>

          {/* Column 3 */}
          <div>
            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="functionLabel">Function</CardLabel>
              <TextInput
                name="function"
                value={formData.function}
                onChange={(e) => setFormData({ ...formData, function: e.target.value })}
                placeholder="Type first 3 letters of Function name"
                style={{ width: "100%" }}
                aria-labelledby="functionLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="narrationLabel">Narration</CardLabel>
              <TextArea
                name="narration"
                value={formData.narration}
                onChange={(e) => setFormData({ ...formData, narration: e.target.value })}
                style={{ width: "100%", height: "60px" }}
                isTextArea={true}
                aria-labelledby="narrationLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="partyBillNumberLabel">Party Bill Number</CardLabel>
              <TextInput
                name="partyBillNumber"
                value={formData.partyBillNumber}
                onChange={(e) => setFormData({ ...formData, partyBillNumber: e.target.value })}
                style={{ width: "100%" }}
                aria-labelledby="partyBillNumberLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="partyBillDateLabel">Party Bill Date</CardLabel>
              <TextInput
                name="partyBillDate"
                value={formData.partyBillDate}
                onChange={(e) => setFormData({ ...formData, partyBillDate: e.target.value })}
                placeholder="DD/MM/YYYY"
                style={{ width: "100%" }}
                aria-labelledby="partyBillDateLabel"
              />
            </LabelFieldPair>

            <LabelFieldPair style={{ alignItems: "flex-start" }}>
              <CardLabel id="partyBillAmountLabel">Party Bill Amount</CardLabel>
              <TextInput
                name="partyBillAmount"
                value={formData.partyBillAmount}
                onChange={(e) => setFormData({ ...formData, partyBillAmount: e.target.value })}
                style={{ width: "100%" }}
                aria-labelledby="partyBillAmountLabel"
              />
            </LabelFieldPair>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel id="billTypeLabel">Bill Type</CardLabel>
            <CustomDropdown
              t={t}
              config={billTypeConfig.populators}
              onChange={(e) => setFormData({ ...formData, billType: e })}
              value={formData.billType}
              aria-labelledby="billTypeLabel"
            />
          </LabelFieldPair>

          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel id="templateLabel">Account Code Template</CardLabel>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <CustomDropdown
                t={t}
                config={templateConfig.populators}
                onChange={(e) => setFormData({ ...formData, template: e })}
                value={formData.template}
                aria-labelledby="templateLabel"
              />
              <Button label="Select" variation="secondary" type="button" />
            </div>
          </LabelFieldPair>
        </div>
      </Card>

      {/* Debit Details */}
      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Debit details
        </CardLabel>
        <div style={{ overflowX: "auto" }}>
          {debitDetails.length > 0 && (
            <Table
              className={"table"}
              t={t}
              customTableWrapperClassName={"dss-table-wrapper"}
              disableSort={true}
              autoSort={false}
              data={debitDetails}
              totalRecords={debitDetails.length}
              columns={debitColumns}
              isPaginationRequired={false}
              manualPagination={false}
              getCellProps={(cellInfo) => ({
                style: {
                  padding: "10px 8px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                },
              })}
            />
          )}
        </div>
      </Card>

      {/* Deduction Details */}
      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Deduction details
        </CardLabel>
        <div style={{ overflowX: "auto" }}>
          {deductionDetails.length > 0 && (
            <Table
              className={"table"}
              t={t}
              customTableWrapperClassName={"dss-table-wrapper"}
              disableSort={true}
              autoSort={false}
              data={deductionDetails}
              totalRecords={deductionDetails.length}
              columns={deductionColumns}
              isPaginationRequired={false}
              manualPagination={false}
              getCellProps={(cellInfo) => ({
                style: {
                  padding: "10px 8px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                },
              })}
            />
          )}
        </div>
      </Card>

      {/* Net Payable */}
      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Net payable
        </CardLabel>
        <div style={{ overflowX: "auto" }}>
          {netPayable.length > 0 && (
            <Table
              className={"table"}
              t={t}
              customTableWrapperClassName={"dss-table-wrapper"}
              disableSort={true}
              autoSort={false}
              data={netPayable}
              totalRecords={netPayable.length}
              columns={netPayableColumns}
              isPaginationRequired={false}
              manualPagination={false}
              getCellProps={(cellInfo) => ({
                style: {
                  padding: "10px 8px",
                  fontSize: "14px",
                  whiteSpace: "nowrap",
                },
              })}
            />
          )}
        </div>
        <div 
          style={{ 
            textAlign: "right", 
            marginTop: "10px", 
            fontSize: "18px", 
            fontWeight: "bold",
            padding: "10px"
          }}
          aria-live="polite"
        >
          Net Payable: ₹ {totalNetPayable.toFixed(2)}
        </div>
      </Card>

      {/* Upload Documents */}
      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Upload Documents
        </CardLabel>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <input
            type="file"
            id="file-upload"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                // Handle file upload
              }
            }}
            aria-label="File upload"
          />
          <Button
            label="Choose file"
            variation="secondary"
            onButtonClick={() => inputRef.current.click()}
            type="button"
          />
          <span>No file chosen</span>
          <Button label="Add File" variation="primary" type="button" />
        </div>
      </Card>

      {/* Approval Details */}
      <Card>
        <CardLabel style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "15px" }}>
          Approval Details
        </CardLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel id="approverDepartmentLabel">Approver Department:</CardLabel>
            <CustomDropdown
              t={t}
              config={approverDepartmentConfig.populators}
              onChange={(e) => setApprovalData({ ...approvalData, approverDepartment: e })}
              value={approvalData.approverDepartment}
              aria-labelledby="approverDepartmentLabel"
            />
          </LabelFieldPair>

          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel id="approverDesignationLabel">Approver Designation:</CardLabel>
            <CustomDropdown
              t={t}
              config={approverDesignationConfig.populators}
              onChange={(e) => setApprovalData({ ...approvalData, approverDesignation: e })}
              value={approvalData.approverDesignation}
              aria-labelledby="approverDesignationLabel"
            />
          </LabelFieldPair>

          <LabelFieldPair style={{ alignItems: "flex-start" }}>
            <CardLabel id="approverLabel">Approver:</CardLabel>
            <CustomDropdown
              t={t}
              config={approverConfig.populators}
              onChange={(e) => setApprovalData({ ...approvalData, approver: e })}
              value={approvalData.approver}
              aria-labelledby="approverLabel"
            />
          </LabelFieldPair>
        </div>

        <LabelFieldPair style={{ alignItems: "flex-start" }}>
          <CardLabel id="commentsLabel">Comments:</CardLabel>
          <TextArea
            name="comments"
            value={approvalData.comments}
            onChange={(e) => setApprovalData({ ...approvalData, comments: e.target.value })}
            style={{ width: "100%", height: "80px" }}
            isTextArea={true}
            aria-labelledby="commentsLabel"
          />
        </LabelFieldPair>
      </Card>

      {/* Action Buttons */}
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button
            label="Clear Form"
            variation="secondary"
            onButtonClick={() => {
              dispatchDebitDetails({ type: "CLEAR_STATE" });
              dispatchDeductionDetails({ type: "CLEAR_STATE" });
              dispatchNetPayable({ type: "CLEAR_STATE" });
              setFormData({
                billDate: "04/07/2025",
                contractor: null,
                workOrder: null,
                zone: null,
                ward: null,
                division: null,
                fund: null,
                department: null,
                scheme: null,
                subScheme: null,
                function: "",
                narration: "",
                partyBillNumber: "",
                partyBillDate: "",
                partyBillAmount: "",
                billType: null,
                template: null,
              });
              setApprovalData({
                approverDepartment: null,
                approverDesignation: null,
                approver: null,
                comments: "",
              });
            }}
            type="button"
            aria-label="Clear form"
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <Button 
              label="Forward" 
              variation="secondary" 
              type="button" 
              aria-label="Forward"
            />
            <Button 
              label="Create And Approve" 
              variation="primary" 
              type="button"
              aria-label="Create and approve"
            />
            <Button 
              label="Close" 
              variation="secondary" 
              type="button"
              aria-label="Close"
            />
          </div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SupplierNewform;