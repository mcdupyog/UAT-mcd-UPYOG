import React from "react";
import { Link } from "react-router-dom";
const GetCell = (value) => <span className="cell-text">{value}</span>;
const GetMobCell = (value) => <span className="sla-cell">{value}</span>;

export const TableConfig = (t) => ({
  Finance2: {
    inboxColumns: (props) => [
      {
        Header: t("FINANCE_NAME"),
        //accessor: "name", // Added accessor
        Cell: ({ row }) => {
          console.log("👉 row.original:", row.original); // 👈 PRINT HERE
          return (
            <div>
              <span className="link">
                <Link to={`${props?.parentRoute}/details/${row?.original?.id}`}>{row.original?.name}</Link>
              </span>
            </div>
          );
        },
        mobileCell: (original) => GetMobCell(original?.name),
      },
      {
        Header: t("FINANCE_MAJOR_CODE"),
        //accessor: "majorCode", // Added accessor
        Cell: ({ row }) => {
          return GetCell(`${row?.original?.majorCode || "-"}`);
        },
        mobileCell: (original) => GetMobCell(original?.majorCode || "-"),
      },
      {
        Header: t("FINANCE_DETAILED_MAX_CODE"),
        //accessor: "maxCode", // Added accessor
        Cell: ({ row }) => {
          return GetCell(`${row.original?.maxCode || "-"}`);
        },
        mobileCell: (original) => GetMobCell(original?.maxCode || "-"),
      },
      {
        Header: t("FINANCE_DETAILED_MIN_CODE"),
        //accessor: "minCode", // Added accessor
        Cell: ({ row }) => {
          return GetCell(`${row.original?.minCode || "-"}`);
        },
        mobileCell: (original) => GetMobCell(original?.minCode || "-"),
      },
      {
        Header: t("FINANCE_ACCOUNT_TYPE"),
        // accessor: "accountType", // Added accessor
        Cell: ({ row }) => {
          return GetCell(t(`${row?.original?.accountType}`));
        },
        mobileCell: (original) => GetMobCell(t(`${original?.accountType}`)),
      },
      {
        Header: t("FINANCE_BUDGETTING_TYPE"),
        //accessor: "budgetingType", // Added accessor
        Cell: ({ row }) => {
          return GetCell(`${row.original?.budgetingType}`);
        },
        mobileCell: (original) => GetMobCell(original?.budgetingType),
      },
      {
        Header: t("FINANCE_ACTIVE"),
        //accessor: "isActive", // Added accessor
        Cell: ({ row }) => {
          const isActive = row.original?.isActive === "TRUE";
          return <span className={isActive ? "status-active" : "status-inactive"}>{isActive ? t("ACTIVE") : t("INACTIVE")}</span>;
        },
        mobileCell: (original) => GetMobCell(original?.isActive === "TRUE" ? t("ACTIVE") : t("INACTIVE")),
      },
    ],
    serviceRequestIdKey: (original) => original?.id,
  },
});
