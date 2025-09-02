import React from "react";
import {
  LabelFieldPair,
  Dropdown,
  DatePicker,
  SubmitBar,
  Button,
} from "@egovernments/digit-ui-react-components";

const CashFlowReport = ({ t }) => {
  const [period, setPeriod] = React.useState(null);
  const [year, setYear] = React.useState(null);
  const [rupees, setRupees] = React.useState(null);
  const [asOnDate, setAsOnDate] = React.useState(null);

  const periods = [
    { code: "Q1", name: "Quarter 1" },
    { code: "Q2", name: "Quarter 2" },
    { code: "Q3", name: "Quarter 3" },
    { code: "Q4", name: "Quarter 4" },
  ];

  const years = [
    { code: "2024-25", name: "2024-2025" },
    { code: "2023-24", name: "2023-2024" },
  ];

  const rupeeTypes = [
    { code: "ACTUAL", name: "Actuals" },
    { code: "BUDGET", name: "Budget" },
  ];

  const handleSubmit = () => {
    console.log({ period, year, rupees, asOnDate });
  };

  const handlePrint = () => {
    console.log("Printing...");
  };

  const handleViewSchedules = () => {
    console.log("Viewing all schedules...");
  };

  return (
    <div style={{ padding: "1rem", background: "#fff" }}>
      <h2
        style={{
          background: "#2C3E50",
          color: "#fff",
          padding: "10px",
          fontSize: "1.2rem",
        }}
      >
        CashFlowReport
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
          padding: "1rem",
        }}
      >
        <LabelFieldPair>
          <label>
            Period <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={periods}
            selected={period}
            select={setPeriod}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Year <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={years}
            selected={year}
            select={setYear}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>As On Date</label>
          <DatePicker date={asOnDate} onChange={setAsOnDate} />
        </LabelFieldPair>

        <LabelFieldPair>
          <label>
            Rupees <span style={{ color: "red" }}>*</span>
          </label>
          <Dropdown
            option={rupeeTypes}
            selected={rupees}
            select={setRupees}
            optionKey="name"
            isMandatory
            t={t}
          />
        </LabelFieldPair>
      </div>

      {/* Mandatory Fields and Print Tips */}
      <div style={{ color: "red", marginLeft: "1rem" }}>
        <p>Mandatory Fields</p>
        <br />
        <p>To print the report, please ensure the following settings:</p>
        <p>1. Paper size: <strong>A4</strong></p>
        <p>2. Paper Orientation: <strong>Landscape</strong></p>
      </div>

      {/* Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginTop: "1.5rem",
        }}
      >
        <SubmitBar label="Submit" onSubmit={handleSubmit} />
        <Button label="Print" variation="primary" onClick={handlePrint} />
        <Button
          label="View All Schedules"
          variation="primary"
          onClick={handleViewSchedules}
        />
      </div>
    </div>
  );
};

export default CashFlowReport;
