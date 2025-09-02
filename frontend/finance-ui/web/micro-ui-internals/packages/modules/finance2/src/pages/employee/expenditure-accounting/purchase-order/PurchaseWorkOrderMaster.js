import React, { useState } from "react";
import {
  CardLabel,
  Dropdown,
  TextInput,
  DatePicker,
  LabelFieldPair,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const PurchaseWorkOrderMaster = () => {
  const [formData, setFormData] = useState({
    purchaseOrderNo: "",
    purchaseOrderDate: null,
    purchaseOrderName: "",
    description: "",
    vendorName: null,
    vendorCode: "",
    totalOrderValue: "",
    fund: null,
    scheme: null,
    sanctionNo: "",
    sanctionDate: null,
    activeYN: true,
    advancePayable: "",
    department: null,
    subScheme: null,
  });

  const [items, setItems] = useState([
    {
      itemName: '',
      unit: 'Nc',
      unitRate: '',
      gstRate: '',
      unitValueWithGST: '',
      quantity: '',
    },
  ]);

  // Separate handlers for form data and items
  const handleFormInputChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSelectChange = (field) => (value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        itemName: '',
        unit: 'Nc',
        unitRate: '',
        gstRate: '',
        unitValueWithGST: '',
        quantity: '',
      },
    ]);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleCreate = () => {
    alert("Purchase Work Order Data:\n" + JSON.stringify({ formData, items }, null, 2));
  };

  const handleClear = () => {
    setFormData({
      purchaseOrderNo: "",
      purchaseOrderDate: null,
      purchaseOrderName: "",
      description: "",
      vendorName: null,
      vendorCode: "",
      totalOrderValue: "",
      fund: null,
      scheme: null,
      sanctionNo: "",
      sanctionDate: null,
      activeYN: true,
      advancePayable: "",
      department: null,
      subScheme: null,
    });
    setItems([
      {
        itemName: '',
        unit: 'Nc',
        unitRate: '',
        gstRate: '',
        unitValueWithGST: '',
        quantity: '',
      },
    ]);
  };

  // Dropdown options
  const vendorOptions = [
    { code: "V1", name: "Vendor 1" },
    { code: "V2", name: "Vendor 2" },
  ];

  const fundOptions = [
    { code: "F1", name: "Fund 1" },
    { code: "F2", name: "Fund 2" },
  ];

  const schemeOptions = [
    { code: "S1", name: "Scheme 1" },
    { code: "S2", name: "Scheme 2" },
  ];

  const departmentOptions = [
    { code: "D1", name: "Department 1" },
    { code: "D2", name: "Department 2" },
  ];

  const subSchemeOptions = [
    { code: "SS1", name: "Sub Scheme 1" },
    { code: "SS2", name: "Sub Scheme 2" },
  ];

  const handleClose = () => window.history.back();

  return (
    <div>
      {/* Purchase Work Order Master */}
      <div style={{ background: "#fff", padding: "1rem", marginTop: "1rem" }}>
        <h2
          style={{
            backgroundColor: "#2C3E50",
            color: "white",
            padding: "10px",
            fontSize: "1.2rem",
            textAlign: "left",
            borderRadius: "4px",
          }}
        >
          Purchase Work Order Master
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          {/* Purchase Order No */}
          <LabelFieldPair>
            <CardLabel>Purchase Order No *</CardLabel>
            <TextInput
              value={formData.purchaseOrderNo}
              onChange={handleFormInputChange("purchaseOrderNo")}
              placeholder="Order No"
            />
          </LabelFieldPair>

          {/* Purchase Order Date */}
          <LabelFieldPair>
            <CardLabel>Purchase Order Date *</CardLabel>
            <DatePicker
              date={formData.purchaseOrderDate}
              onChange={handleFormInputChange("purchaseOrderDate")}
              placeholder="Select Date"
            />
          </LabelFieldPair>

          {/* Purchase Order Name */}
          <LabelFieldPair>
            <CardLabel>Purchase Order Name *</CardLabel>
            <TextInput
              value={formData.purchaseOrderName}
              onChange={handleFormInputChange("purchaseOrderName")}
              placeholder="Order Name"
            />
          </LabelFieldPair>

          {/* Description */}
          <LabelFieldPair>
            <CardLabel>Description</CardLabel>
            <TextInput
              value={formData.description}
              onChange={handleFormInputChange("description")}
              placeholder="Description"
            />
          </LabelFieldPair>

          {/* Vendor Name */}
          <LabelFieldPair>
            <CardLabel>Vendor Name *</CardLabel>
            <Dropdown
              option={vendorOptions}
              selected={formData.vendorName}
              select={handleFormSelectChange("vendorName")}
              optionKey="name"
              placeholder="Select Vendor"
            />
          </LabelFieldPair>

          {/* Vendor Code */}
          <LabelFieldPair>
            <CardLabel>Vendor Code</CardLabel>
            <TextInput
              value={formData.vendorCode}
              onChange={handleFormInputChange("vendorCode")}
              placeholder="Vendor Code"
            />
          </LabelFieldPair>

          {/* Total Order Value */}
          <LabelFieldPair>
            <CardLabel>Total Order Value *</CardLabel>
            <TextInput
              type="number"
              value={formData.totalOrderValue}
              onChange={handleFormInputChange("totalOrderValue")}
              placeholder="Total Value"
            />
          </LabelFieldPair>

          {/* Fund */}
          <LabelFieldPair>
            <CardLabel>Fund *</CardLabel>
            <Dropdown
              option={fundOptions}
              selected={formData.fund}
              select={handleFormSelectChange("fund")}
              optionKey="name"
              placeholder="Select Fund"
            />
          </LabelFieldPair>

          {/* Scheme */}
          <LabelFieldPair>
            <CardLabel>Scheme</CardLabel>
            <Dropdown
              option={schemeOptions}
              selected={formData.scheme}
              select={handleFormSelectChange("scheme")}
              optionKey="name"
              placeholder="Select Scheme"
            />
          </LabelFieldPair>

          {/* Sub Scheme */}
          <LabelFieldPair>
            <CardLabel>Sub Scheme</CardLabel>
            <Dropdown
              option={subSchemeOptions}
              selected={formData.subScheme}
              select={handleFormSelectChange("subScheme")}
              optionKey="name"
              placeholder="Select Sub Scheme"
            />
          </LabelFieldPair>

          {/* Department */}
          <LabelFieldPair>
            <CardLabel>Department *</CardLabel>
            <Dropdown
              option={departmentOptions}
              selected={formData.department}
              select={handleFormSelectChange("department")}
              optionKey="name"
              placeholder="Select Department"
            />
          </LabelFieldPair>

          {/* Sanction No */}
          <LabelFieldPair>
            <CardLabel>Sanction No.</CardLabel>
            <TextInput
              value={formData.sanctionNo}
              onChange={handleFormInputChange("sanctionNo")}
              placeholder="Sanction No."
            />
          </LabelFieldPair>

          {/* Sanction Date */}
          <LabelFieldPair>
            <CardLabel>Sanction Date</CardLabel>
            <DatePicker
              date={formData.sanctionDate}
              onChange={handleFormInputChange("sanctionDate")}
              placeholder="Select Sanction Date"
            />
          </LabelFieldPair>

          {/* Advance Payable */}
          <LabelFieldPair>
            <CardLabel>Advance Payable</CardLabel>
            <TextInput
              type="number"
              value={formData.advancePayable}
              onChange={handleFormInputChange("advancePayable")}
              placeholder="Advance Payable"
            />
          </LabelFieldPair>

          {/* Active Y/N */}
          <LabelFieldPair>
            <CardLabel>Active Y/N</CardLabel>
            <div style={{ paddingTop: "8px" }}>
              <input
                type="checkbox"
                checked={formData.activeYN}
                onChange={(e) =>
                  setFormData({ ...formData, activeYN: e.target.checked })
                }
              />{" "}
              Active
            </div>
          </LabelFieldPair>
        </div>

        {/* Action Buttons */}
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <SubmitBar label="Create" onSubmit={handleCreate} />
          <Button label="Clear" variation="secondary" onClick={handleClear} />
          <Button label="Close" variation="secondary" onClick={handleClose} />
        </div>
      </div>

      {/* Purchase Items Table */}
      <div style={{ marginTop: "2rem" }}>
        <h2>Purchase-Items</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Items</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Unit</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>UnitRate</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>GSTRate</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>UnitValueWithGST</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '8px', border: '1px solid #ddd' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <input
                    type="text"
                    placeholder="Type first 3 letters of Acco"
                    value={item.itemName}
                    onChange={(e) =>
                      handleItemInputChange(index, 'itemName', e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <select
                    value={item.unit}
                    onChange={(e) =>
                      handleItemInputChange(index, 'unit', e.target.value)
                    }
                  >
                    <option value="Nc">Nc</option>
                    {/* Add other options if needed */}
                  </select>
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <input
                    type="number"
                    value={item.unitRate}
                    onChange={(e) =>
                      handleItemInputChange(index, 'unitRate', e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <input
                    type="number"
                    value={item.gstRate}
                    onChange={(e) =>
                      handleItemInputChange(index, 'gstRate', e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <input
                    type="number"
                    value={item.unitValueWithGST}
                    onChange={(e) =>
                      handleItemInputChange(index, 'unitValueWithGST', e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemInputChange(index, 'quantity', e.target.value)
                    }
                  />
                </td>
                <td style={{ padding: '8px', border: '1px solid #ddd' }}>
                  <button onClick={addItem}>+</button>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(index)}>-</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Action buttons for items */}
        <div style={{ marginTop: '10px' }}>
          <button
            style={{ backgroundColor: 'green', color: 'white', marginRight: '10px', padding: '8px 16px' }}
            onClick={handleCreate}
          >
            Create
          </button>
          <button
            style={{ backgroundColor: 'orange', color: 'white', marginRight: '10px', padding: '8px 16px' }}
            onClick={handleClear}
          >
            Clear
          </button>
          <button
            style={{ backgroundColor: 'red', color: 'white', padding: '8px 16px' }}
            onClick={() => alert('Close button clicked')}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseWorkOrderMaster;