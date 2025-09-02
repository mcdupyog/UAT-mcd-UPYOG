import React, { useState } from "react";
import {
  DatePicker,
  Dropdown,
  SubmitBar,
  TextInput,
} from "@egovernments/digit-ui-react-components";
import AccountsHeadSection from "./AccountsHeadSection";
import PaymentModeForm from "./PaymentModeForm";

const CreateMiscellaneousReceipt = () => {
  const [form, setForm] = useState({
    receiptDate: null,
    narration: "",
    paidBy: "",
    payeeAddress: "",
    serviceCategory: null,
  });

  const handleChange = (field) => (value) => {
    setForm({ ...form, [field]: value });
  };

  const handleInputChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = () => {
    alert(JSON.stringify(form, null, 2));
  };

  const serviceOptions = [
    { code: "Select", name: "----Choose----" },
    { code: "WATER", name: "Water Charges" },
    { code: "ELECTRICITY", name: "Electricity" },
    { code: "PROPERTY", name: "Property Tax" },
  ];

  return (
    <div style={{ width: "100%", padding: "20px", background: "#f1f1f1" }}>
      <div
        style={{
          background: "#fff",
          margin: "0 auto",
          padding: "0",
          maxWidth: "95%",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        {/* Header */}
        <div style={{ backgroundColor: "#2C3E50", padding: "12px 16px" }}>
          <h2 style={{ margin: 0, color: "white", fontSize: "18px" }}>
            Create Miscellaneous Receipt
          </h2>
        </div>

        {/* Form */}
        <div style={{ padding: "20px" }}>
          {/* Row 1: Date + Narration */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label>Receipt Date <span style={{ color: "red" }}>*</span></label>
              <DatePicker
                date={form.receiptDate}
                onChange={handleChange("receiptDate")}
                placeholder="dd/mm/yyyy"
                style={{ width: "100%", border: "1px solid green" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Narration</label>
              <textarea
                value={form.narration}
                onChange={handleInputChange("narration")}
                placeholder="Narration"
                style={{
                  width: "100%",
                  height: "80px",
                  border: "1px solid green",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              />
            </div>
          </div>

          {/* Row 2: Paid By + Payee Address */}
          <div style={{ display: "flex", gap: "20px", marginBottom: "20px", flexWrap: "wrap" }}>
            <div style={{ flex: 1 }}>
              <label>Paid By <span style={{ color: "red" }}>*</span></label>
              <TextInput
                value={form.paidBy}
                onChange={handleInputChange("paidBy")}
                placeholder="Paid By"
                style={{ border: "1px solid green" }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>Payee Address</label>
              <textarea
                value={form.payeeAddress}
                onChange={handleInputChange("payeeAddress")}
                placeholder="Payee Address"
                style={{
                  width: "100%",
                  height: "80px",
                  border: "1px solid green",
                  borderRadius: "4px",
                  padding: "8px",
                }}
              />
            </div>
          </div>

          {/* Row 3: Service Category */}
          <div style={{ marginBottom: "20px" }}>
            <label>Service Category <span style={{ color: "red" }}>*</span></label>
            <Dropdown
              option={serviceOptions}
              selected={form.serviceCategory}
              select={handleChange("serviceCategory")}
              optionKey="name"
              placeholder="----Choose----"
              style={{ width: "100%", border: "1px solid green" }}
            />
          </div>

          {/* Submit Button */}
           {/* Header */}
        <div style={{ padding: "12px 16px" }}>
          
          <AccountsHeadSection/>
        </div>
         <div style={{ backgroundColor: "#2C3E50", padding: "12px 16px" }}>
          <h2 style={{ margin: 0, color: "white", fontSize: "18px" }}>
            Payement Details
          </h2>
          
            
        </div>
        <div style={{ backgroundColor: "#FFFFCC", padding: "10px 0" }}>
            <h2
                style={{
                margin: 0,
                color: "black",
                fontSize: "18px",
                textAlign: "center",
                }}
            >
                Total Amount
            </h2>
        </div>
            <PaymentModeForm/>

        </div>
      </div>
    </div>
  );
};

export default CreateMiscellaneousReceipt;
