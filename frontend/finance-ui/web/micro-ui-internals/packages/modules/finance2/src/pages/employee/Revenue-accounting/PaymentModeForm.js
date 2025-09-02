import React, { useState } from "react";
import {
  Card,
  CardLabel,
  LabelFieldPair,
  TextInput,
  DatePicker,
} from "@egovernments/digit-ui-react-components";

const PaymentModeForm = () => {
  const [paymentMode, setPaymentMode] = useState("cash"); // default selected cash

  const [formData, setFormData] = useState({
    paidBy: "",
    amount: "",
    g8Number: "",
    g8Date: null,
    last4Digits: "",
    transactionNumber: "",
    reEnterTransactionNumber: "",
    chequeNumber: "",
    chequeDate: null,
    ifscCode: "",
    bankName: "",
    branchName: "", 
  });

  const handlePay = () => {
  // Submit formData logic here
  console.log("Pay clicked", formData);
};

const handleReset = () => {
  setFormData({
    paidBy: "",
    amount: "",
    last4Digits: "",
    transactionNumber: "",
    reEnterTransactionNumber: "",
    g8Number: "",
    g8Date: null
  });
};

const handleClose = () => {
  // Close modal or hide the card block
  console.log("Close clicked");
};

  const handleChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <Card style={{ padding: "1.5rem", margin: "2rem auto", Width: "full" }}>
      <h2 style={{ backgroundColor: "#2C3E50", color: "#fff", padding: "10px" }}>
        Select Payment Mode
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <LabelFieldPair>
          <CardLabel>Select Mode *</CardLabel>
          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {["cash", "cheque", "dd", "card"].map((mode) => (
              <label key={mode} style={{ fontWeight: "500" }}>
                <input
                  type="radio"
                  name="paymentMode"
                  value={mode}
                  checked={paymentMode === mode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  style={{ marginRight: "8px" }}
                />
               {mode === "cash"
                ? "Cash"
                : mode === "cheque"
                ? "Cheque"
                : mode === "dd"
                ? "DD"
                : mode === "card"
                ? "Card"
                : null}

              </label>
            ))}
          </div>
        </LabelFieldPair>
      </div>
      {paymentMode === "cash" && (
        <div style={{ backgroundColor: "#FFFFCC", padding: "1rem", borderRadius: "5px" }}>
          
          {/* Row 1: Paid By & Amount */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                Paid By <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.paidBy}
                onChange={(e) => handleChange("paidBy")(e.target.value)}
                placeholder="Paid By"
                style={{ border: "1px solid green", width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                Amount <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount")(e.target.value)}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Row 2: G8 Number & G8 Date */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                G8 Receipt Number <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.g8Number}
                onChange={(e) => handleChange("g8Number")(e.target.value)}
                placeholder="G8 Receipt Number"
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                G8 Receipt Date <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                date={formData.g8Date}
                onChange={handleChange("g8Date")}
                placeholder="DD/MM/YYYY"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      )}

{(paymentMode === "cheque" || paymentMode === "dd") && (
          <div style={{ backgroundColor: "#FFFFCC", padding: "1rem", borderRadius: "5px" }}>
          
          {/* Row 1: Paid By & Amount */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                Paid By <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.paidBy}
                onChange={(e) => handleChange("paidBy")(e.target.value)}
                placeholder="Paid By"
                style={{ border: "1px solid green", width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                Amount <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                type="number"
                value={formData.amount}
                onChange={(e) => handleChange("amount")(e.target.value)}
                placeholder="0"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Row 2: DD/Cheque Number & Date */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                DD/Cheque Number <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.chequeNumber}
                onChange={(e) => handleChange("chequeNumber")(e.target.value)}
                placeholder="Enter Cheque/DD Number"
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                DD/Cheque Date <span style={{ color: "red" }}>*</span>
              </label>
              <DatePicker
                date={formData.chequeDate}
                onChange={handleChange("chequeDate")}
                placeholder="DD/MM/YYYY"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Row 3: IFSC Code & Bank Name */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                IFSC Code <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.ifscCode}
                onChange={(e) => handleChange("ifscCode")(e.target.value)}
                placeholder="Search..."
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                Bank Name <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.bankName}
                onChange={(e) => handleChange("bankName")(e.target.value)}
                placeholder="Bank Name"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Row 4: Branch Name & G8 Receipt Number */}
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <div style={{ flex: 1 }}>
              <label>
                Branch Name <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.branchName}
                onChange={(e) => handleChange("branchName")(e.target.value)}
                placeholder="Branch Name"
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ flex: 1 }}>
              <label>
                G8 Receipt Number <span style={{ color: "red" }}>*</span>
              </label>
              <TextInput
                value={formData.g8Number}
                onChange={(e) => handleChange("g8Number")(e.target.value)}
                placeholder="G8 Receipt Number"
                style={{ width: "100%" }}
              />
            </div>
          </div>

          {/* Row 5: G8 Receipt Date */}
          <div style={{ flex: 1, marginBottom: "1rem" }}>
            <label>
              G8 Receipt Date <span style={{ color: "red" }}>*</span>
            </label>
            <DatePicker
              date={formData.g8Date}
              onChange={handleChange("g8Date")}
              placeholder="DD/MM/YYYY"
              style={{ width: "100%" }}
            />
          </div>

        </div>
      )}

      
      {paymentMode === "card" && (
  <div style={{ backgroundColor: "#FFFFCC", padding: "1rem", borderRadius: "5px" }}>

    {/* Row 1: Paid By & Amount */}
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ flex: 1 }}>
        <label>
          Paid By <span style={{ color: "red" }}>*</span>
        </label>
        <TextInput
          value={formData.paidBy}
          onChange={(e) => handleChange("paidBy")(e.target.value)}
          placeholder="Paid By"
          style={{ width: "100%", border: "1px solid green" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <label>
          Amount <span style={{ color: "red" }}>*</span>
        </label>
        <TextInput
          type="number"
          value={formData.amount}
          onChange={(e) => handleChange("amount")(e.target.value)}
          placeholder="0"
          style={{ width: "100%" }}
        />
      </div>
    </div>

    {/* Row 2: Last 4 Digits & Transaction Number */}
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ flex: 1 }}>
        <label>
          Last 4 digits of your card <span style={{ color: "red" }}>*</span>
        </label>
        <TextInput
          value={formData.last4Digits}
          onChange={(e) => handleChange("last4Digits")(e.target.value)}
          placeholder="XXXX"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <label>
          Transaction Number <span style={{ color: "red" }}>*</span>
        </label>
        <TextInput
          value={formData.transactionNumber}
          onChange={(e) => handleChange("transactionNumber")(e.target.value)}
          placeholder="Transaction Number"
          style={{ width: "100%" }}
        />
      </div>
    </div>

    {/* Row 3: Re-enter Transaction Number */}
    <div style={{ marginBottom: "1rem" }}>
      <label>
        Re-enter Transaction Number <span style={{ color: "red" }}>*</span>
      </label>
      <TextInput
        value={formData.reEnterTransactionNumber}
        onChange={(e) => handleChange("reEnterTransactionNumber")(e.target.value)}
        placeholder="Re-enter Transaction Number"
        style={{ width: "100%" }}
      />
    </div>

    {/* Row 4: G8 Receipt Number & Date */}
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <div style={{ flex: 1 }}>
        <label>
          G8 Receipt Number <span style={{ color: "red" }}>*</span>
        </label>
        <TextInput
          value={formData.g8Number}
          onChange={(e) => handleChange("g8Number")(e.target.value)}
          placeholder="G8 Receipt Number"
          style={{ width: "100%" }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <label>
          G8 Receipt Date <span style={{ color: "red" }}>*</span>
        </label>
        <DatePicker
          date={formData.g8Date}
          onChange={handleChange("g8Date")}
          placeholder="DD/MM/YYYY"
          style={{ width: "100%" }}
        />
      </div>
    </div>

    {/* ✅ Action Buttons inside */}
    <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
      <button
        type="button"
        onClick={handlePay}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Pay
      </button>
      <button
        type="button"
        onClick={handleReset}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#FFC107",
          color: "black",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Reset
      </button>
      <button
        type="button"
        onClick={handleClose}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#F44336",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}


    </Card>
  );
};

export default PaymentModeForm;
