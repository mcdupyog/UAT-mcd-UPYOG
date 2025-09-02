
import React, { useState, useEffect, useMemo } from "react";
import { Card, Button, Table, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";

const ChequeIssueReportTable = ({ filters }) => {
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(null);
  const [reportData, setReportData] = useState([]);

  const columns = useMemo(() => [
    {
      Header: "ID",
      accessor: "id",
      width: 50,
    },
    {
      Header: "Cheque Number",
      accessor: "chequeNumber",
      width: 100,
    },
    {
      Header: "Cheque Date",
      accessor: "chequeDate",
      width: 100,
    },
    {
      Header: "Name of the Payee",
      accessor: "payeeName",
      width: 180,
    },
    {
      Header: "Cheque Amount(Rs)",
      accessor: "amount",
      width: 120,
      Cell: ({ value }) => new Intl.NumberFormat('en-IN').format(value),
    },
    {
      Header: "Nature of Payment",
      accessor: "paymentNature",
      width: 120,
    },
    {
      Header: "Cheque Status",
      accessor: "status",
      width: 100,
    },
    {
      Header: "Payment Order No. & Date",
      accessor: "paymentOrder",
      width: 200,
    },
    {
      Header: "Bank Payment Voucher No. & Date",
      accessor: "voucherDetails",
      width: 220,
    },
    {
      Header: "Bank Advice Report",
      accessor: "adviceReport",
      width: 150,
    },
    {
      Header: "Print Cheque",
      accessor: "print",
      width: 100,
      Cell: ({ row }) => (
        row.original.status === "New" && (
          <Button
            label="Print"
            variation="secondary"
            type="button"
            onClick={() => handlePrintCheque(row.original)}
            style={{ padding: "5px 10px", fontSize: "12px" }}
          />
        )
      ),
    },
  ], []);

  const generateDummyData = () => {
    return [
      {
        id: 1,
        chequeNumber: "100000",
        chequeDate: "24 May 2015",
        payeeName: "March 1st year",
        amount: 16000.00,
        paymentNature: "Bill Payment",
        status: "Surrendered",
        paymentOrder: "BuyR0M2H2-24000001, 24 May 2015",
        voucherDetails: "18'mV00000000002015-31, 24 May 2015",
        adviceReport: "Cheque Issue Advice",
      },
      // ... other dummy data items
    ];
  };

  const handlePrintCheque = (chequeData) => {
    console.log("Printing cheque:", chequeData);
    setShowToast({
      label: `Printing cheque ${chequeData.chequeNumber}`,
      isError: false,
    });
  };

  useEffect(() => {
    if (filters) {
      setReportData(generateDummyData());
    }
  }, [filters]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (!filters) return null;

  return (
    <Card style={{ padding: "16px" }}>
      {showToast && (
        <Toast
          label={showToast.label}
          error={showToast.isError}
          isDleteBtn={true}
          onClose={() => setShowToast(null)}
        />
      )}

      <h2 style={{ marginBottom: "20px" }}>
        Cheque Issue register report for {filters.bankBranch?.label} with account no: {filters.bankAccount?.label.split('-')[0]} from{" "}
        {filters.fromDate?.toLocaleDateString() || "N/A"} to {filters.toDate?.toLocaleDateString() || "N/A"}
      </h2>
      
      <div style={{ overflowX: "auto" }}>
        <Table
          t={t}
          data={reportData}
          columns={columns}
          getCellProps={() => ({
            style: {
              padding: "8px",
              fontSize: "12px",
              whiteSpace: "nowrap",
            },
          })}
          manualPagination={true}
          isPaginationRequired={true}
          pageSizeLimit={10}
          styles={{
            minWidth: "1000px",
            borderCollapse: "collapse",
          }}
          noColumnBorder={false}
        />
      </div>

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between" }}>
        <Button label="Email" variation="secondary" />
        <Button label="Export to PDF" variation="secondary" />
      </div>
    </Card>
  );
};

export default ChequeIssueReportTable;