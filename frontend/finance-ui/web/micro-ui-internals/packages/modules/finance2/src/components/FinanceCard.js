/**
 * Created By : Umesh Kumar 
 * Created On : 13-05-2025
 * Purpose : Finance Card for micro-ui
 * Code status : open
 */
import { EmployeeModuleCard, FinanceChartIcon } from "@mcd89/finance-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const FinanceCard = () => {
  const { t } = useTranslation();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map(role => role.code) || [];
  const isFinanceUser = userRoles.includes("EMPLOYEE") || userRoles.includes("FINANCE");

  if (!isFinanceUser) return null;
  // if (!Digit.Utils.finance2Access()) {
  //   return null;
  // }

  // const FINANCE2_CEMP = Digit.UserService.hasAccess(["EGF_BILL_CREATOR","EGF_BILL_APPROVER"]) || false;
  const propsForModuleCard = {
    Icon: <FinanceChartIcon />,
    moduleName: t("ACTION_TEST_FINANCE-2.O").toUpperCase(),
    links: [
       {
        label: t("Sample"),
        link: `/${window?.contextPath}/employee/finance2/sample`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("ACTION_TEST_INBOX"),
        link: `/${window?.contextPath}/employee/finance2/inbox`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("TENANT_FINANCE_MODULE"),
        link: `/${window?.contextPath}/employee/finance2/voucher/journalVoucher`,
        //   roles: ROLES.LOCALISATION,
      },
      {
        label: t("ACTION_TEST_APPLY_TEST"),
        link: `/${window?.contextPath}/employee/finance2/test`,
        //   roles: ROLES.WORKFLOW,
      },

      // ---------------------------------START PRABHU-SSPL----------------------------------------
             {
        label: t("Expense Bill"),
        link: `/${window?.contextPath}/employee/finance2/expensebill/newform`,
        //   roles: ROLES.MDMS,
      },
         {
        label: t("Bill Voucher"),
        link: `/${window?.contextPath}/employee/finance2/bill-voucher/billvoucherform`,
        //   roles: ROLES.MDMS,
      },
           {
        label: t("View Bill Registers"),
        link: `/${window?.contextPath}/employee/finance2/bill-register/billregistersearch`,
        //   roles: ROLES.MDMS,
      },

      {
        label: t("Contractor Bill"),
        link: `/${window?.contextPath}/employee/finance2/contractor-bill/newform`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Supplier Bill"),
        link: `/${window?.contextPath}/employee/finance2/supplier-bill/newform`,
        //   roles: ROLES.MDMS,
      },



      // Paymets module
      {
        label: t("Create Direct Bank Payment"),
        link: `/${window?.contextPath}/employee/finance2/direct-bank-payment/DirectBankPayment-Form`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("RTGS Assignment"),
        link: `/${window?.contextPath}/employee/finance2/rtgs-assignment/ChequeAssignment-beforeRtgsSearch`,
        
        //   roles: ROLES.MDMS,
      },

      {
        label: t("Bill Payment "),
        link: `/${window?.contextPath}/employee/finance2/bll-payments/Payment-beforeSearch`,
        //   roles: ROLES.MDMS,
      },


      {
        label: t("Cheque Assignment"),
        link: `/${window?.contextPath}/employee/finance2/cheque-assignment/ChequeAssignmentBeforeSearch`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Surrender Cheque"),
        link: `/${window?.contextPath}/employee/finance2/surrender-cheque/BeforeSearchForSurrender`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Surrender RTGS"),
        link: `/${window?.contextPath}/employee/finance2/surrender-rtgs-search/BeforeSearchForRTGSSurrender`,
        //   roles: ROLES.MDMS,
      },



       /* Report Generation */

           /* - MIS Reports */

      {
        label: t("Cheque Issue Register "),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/chequeIssueRegisterReport`,
        //   roles: ROLES.MDMS,
      },

      {
        label: t("Voucher Status Report "),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/voucherStatusReport-beforeSearch`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Complete Bill Register Report "),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/billRegisterReport-searchform`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Bank Advice Report for RTGS Bank Payment"),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/bankAdviceReport-newForm`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("RTGS register report"),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/rtgsIssueRegisterReport-newForm`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Surrendered Cheque"),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/surrendered-cheque`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Dishonoured Cheque report "),
        link: `/${window?.contextPath}/employee/finance2/reports/mis-reports/dishonouredcheque`,
        //   roles: ROLES.MDMS,
      },


      /* - Accounting Records */

      {
        label: t("Trial Balance"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/TrialBalance`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("General Ledger Report"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/GeneralLedgerReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Sub Ledger Schedule Report"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/SubLedgerScheduleReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Sub Ledger Report"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/SubLedgerReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Day Book Report"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/DayBookReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Journal Book Report"),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/JournalBookReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Opening Balance Report "),
        link: `/${window?.contextPath}/employee/finance2/reports/accounting-records/OpeningBalanceReport`,
        //   roles: ROLES.MDMS,
      },


 // ---------------------------------END PRABHU-SSPL----------------------------------------
           


       {
        label: t("Receipt Payment Report"),
        link: `/${window?.contextPath}/employee/finance2/report/receiptPaymentReport-newForm`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Cash Flow Report"),
        link: `/${window?.contextPath}/employee/finance2/report/cashFlowReport-generateCashFlowReport`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("View Bank Uploads Files"),
        link: `/${window?.contextPath}/employee/finance2/bankstatement/search`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Reconcile Bank Statement"),
        link: `/${window?.contextPath}/employee/finance2/brs/autoReconciliation-newForm`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Reconcile Bank Statement Upload"),
        link: `/${window?.contextPath}/employee/finance2/brs/bank-reconciliation-upload`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Reconcile Summary Report"),
        link: `/${window?.contextPath}/employee/finance2/brs/bank-reconciliation-summary-report`,
        //   roles: ROLES.MDMS,
      }, 
      {
        label: t("Bank statement Entites Not in Bank Book"),
        link: `/${window?.contextPath}/employee/finance2/brs/bank-entries-not-in-bank-book`,
        //   roles: ROLES.MDMS,
      },
       {
        label: t("Reconcile with Bank Manual"),
        link: `/${window?.contextPath}/employee/finance2/brs/manual-bank-reconciliation`,
        //   roles: ROLES.MDMS,
      }
      ,
       {
        label: t("Create Work Order Master"),
        link: `/${window?.contextPath}/employee/finance2/brs/work-order/create-work-order-master-form`,
        //   roles: ROLES.MDMS,
      }
      ,
       {
        label: t("Create Purchase Order Master"),
        link: `/${window?.contextPath}/employee/finance2/brs/purchase-order/create-work-order-master`,
        //   roles: ROLES.MDMS,
      }
      // Add more links as needed
      ,
       {
        label: t("Create Miscellaneous Receipt"),
        link: `/${window?.contextPath}/employee/finance2/brs/revenue-accounting/Create-Miscellaneous-Receipt`,
        //   roles: ROLES.MDMS,
      }
      ,
       {
        label: t("Cash Remittance Form"),
        link: `/${window?.contextPath}/employee/finance2/brs/revenue-accounting/cash-remittance-form`,
        //   roles: ROLES.MDMS,
      }
      ,
       {
        label: t("Cheque Remittance Form"),
        link: `/${window?.contextPath}/employee/finance2/brs/revenue-accounting/cheque-remittance-form`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Search Receipts"),
        link: `/${window?.contextPath}/employee/finance2/brs/revenue-accounting/search-receipts`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Opening Balance Entry"),
        link: `/${window?.contextPath}/employee/finance2/configuration-setup/opening-balance`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Transfer closing Balance"),
        link: `/${window?.contextPath}/employee/finance2/configuration-setup/transfer-closing-balance`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Close Financial Year"),
        link: `/${window?.contextPath}/employee/finance2/configuration-setup/close-financial-year`,
        //   roles: ROLES.MDMS,
      },
      {
        label: t("Closing Period"),
        link: `/${window?.contextPath}/employee/finance2/configuration-setup/close-period`,
        //   roles: ROLES.MDMS,
      },
      

      // ---------------------------------START PULKIT-SSPL----------------------------------------
      // {
      //   label: t("FINANCE_CREATE_BUDGET_GROUP"),
      //   link: `/${window?.contextPath}/employee/finance2/create-budget-group`,
      //   //   roles: ROLES.WORKFLOW,
      // },
      // {
      //   label: t("FINANCE_CREATE_BUDGET_DEFINITION"),
      //   link: `/${window?.contextPath}/employee/finance2/create-budget-definition`,
      //   //   roles: ROLES.WORKFLOW,
      // },
      
      // // adding search budget component here
      // {
      //   label: t("FINANCE_SEARCH_BUDGET"),
      //   link: `/${window?.contextPath}/employee/finance2/search-budget`,
      //   //   roles: ROLES.WORKFLOW,
      // },
    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default FinanceCard;