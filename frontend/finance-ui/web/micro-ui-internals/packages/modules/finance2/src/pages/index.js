import React, { useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrivateRoute, AppContainer, BreadCrumb } from "@egovernments/digit-ui-react-components";
import Inbox from "../components/inbox";
import ReceiptNewform from "./employee/FinanceReceiptForm";

// PRABHU-SSPL

import ExpenseBillNewform from "./employee/expenditure-accounting/bills-accounting/expense-bill/NewForm";
import BillVoucherForm from "./employee/expenditure-accounting/bills-accounting/bill-voucher/BillVoucherForm"
import BillRegisterSearch from "./employee/expenditure-accounting/bills-accounting/bill-register/BillRegisterSearch";
import ContractorNewform from "./employee/expenditure-accounting/bills-accounting/contractor-bill/NewForm";
import SupplierNewform from "./employee/expenditure-accounting/bills-accounting/supplier-bill/NewForm";
import PaymentBeforeSearch from "./employee/expenditure-accounting/payments/bll-payments/Payment-beforeSearch";
import ChequeAssignmentBeforeSearch from "./employee/expenditure-accounting/payments/cheque-assignment/ChequeAssignmentBeforeSearch";
import DirectBankPaymentForm from "./employee/expenditure-accounting/payments/direct-bank-payment/DirectBankPayment-Form";
import ChequeAssignmentBeforeRtgsSearch from "./employee/expenditure-accounting/payments/rtgs-assignment/ChequeAssignment-beforeRtgsSearch";
import BeforeSearchForSurrender from "./employee/expenditure-accounting/payments/surrender-cheque/BeforeSearchForSurrender";
import BeforeSearchForRTGSSurrender from "./employee/expenditure-accounting/payments/surrender-rtgs-search/BeforeSearchForRTGSSurrender";



import ReceiptPaymentReport from "./employee/expenditure-accounting/receiptPaymentReport/receiptPaymentReport";
import CashFlowReport from "./employee/cashFlowReport-generateCashFlowReport/CashFlowReport";
import BankStatementSearch from "./employee/expenditure-accounting/Bank-Reconciliation/viewBankUploadFileStatement";
import AutoBankReconciliation from "./employee/expenditure-accounting/Bank-Reconciliation/AutoBankReconciliation";
import AutoBankReconciliationUpload from "./employee/expenditure-accounting/Bank-Reconciliation/AutoBankReconciliationUpload";
import BankReconciliationSummary from "./employee/expenditure-accounting/Bank-Reconciliation/BankReconciliationSummary.js";
import BankEntriesNotInBankBook from "./employee/expenditure-accounting/Bank-Reconciliation/BankEntriesNotInBankBook.js";
import ReconcileWithBankManual from "./employee/expenditure-accounting/Bank-Reconciliation/ReconcileWithBankManual.js";
import CreateWorkOrderMasterForm from "./employee/expenditure-accounting/work-order/CreateWorkOrderMasterForm.js";
import PurchaseWorkOrderMaster from "./employee/expenditure-accounting/purchase-order/PurchaseWorkOrderMaster.js";
import CreateMiscellaneousReceipt from "./employee/Revenue-accounting/MiscellaneousReceipt.js";
// import CashRemittanceForm from "./employee/Revenue-accounting/CashRemittanceForm.js";
import RemittanceForm from "./employee/hooks/RemittanceForm.js";
import SearchReceipts from "./employee/Revenue-accounting/SearchReceipts.js";

// adding budget components here////////
import CreateBudgetGroup from "./employee/Budget/CreateBudgetGroup";
import CreateBudgetDefinition from "./employee/Budget/CreateBudgetDefinition";
import OpeningBalanceForm from "./employee/configuration-setup/OpeningBalanceForm.js";
import SearchBudget from "./employee/Budget/SearchBudget";
import ClosedPeriodForm from "./employee/hooks/ClosedPeriodForm.js";
import SearchBox from "./employee/hooks/Searchbox.js";
import ChequeIssueRegisterReport from "./employee/reports/mis-reports/chequeIssueRegisterReport.js";
import BankAdviceReportNewForm from "./employee/reports/mis-reports/bankAdviceReport-newForm.js";
import RtgsIssueRegisterReportNewForm from "./employee/reports/mis-reports/rtgsIssueRegisterReport-newForm.js";
import SurrenderedCheque from "./employee/reports/mis-reports/surrendered-cheque.js";
import Dishonouredcheque from "./employee/reports/mis-reports/dishonouredcheque.js";
import VoucherStatusReportBeforeSearch from "./employee/reports/mis-reports/voucherStatusReport-beforeSearch.js";
import BillRegisterReportSearch from "./employee/reports/mis-reports/billRegisterReport-search.js";
import TrialBalance from "./employee/reports/accounting-records/TrialBalance.js";
import GeneralLedgerReport from "./employee/reports/accounting-records/GeneralLedgerReport.js";
import SubLedgerScheduleReport from "./employee/reports/accounting-records/SubLedgerScheduleReport.js";
import SubLedgerReport from "./employee/reports/accounting-records/SubLedgerReport.js";
import DayBookReport from "./employee/reports/accounting-records/DayBookReport.js";
import JournalBookReport from "./employee/reports/accounting-records/JournalBookReport.js";
import OpeningBalanceReport from "./employee/reports/accounting-records/OpeningBalanceReport.js";
// import SearchBox from "./employee/hooks/Searchbox";
// import ClosedPeriodForm from "./employee/configuration-setup/ClosedPeriodForm";
// import JournalVoucher from "./employee/configuration-setup/JournalVoucher.js";


const FinanceBreadCrumb = ({ location, defaultPath }) => {
  const { t } = useTranslation();
  const search = useLocation().search;
  const fromScreen = new URLSearchParams(search).get("from") || null;
  const pathVar = location.pathname.replace(defaultPath + "/", "").split("?")?.[0];

  const crumbs = [
    {
      path: `/${window?.contextPath}/employee`,
      content: t("HOME"),
      show: true,
    },
    {
      path: `/${window.contextPath}/employee/finance`,
      content: t("FINANCE_HOME"),
      show: true,
    },
    {
      path: `/${window.contextPath}/employee/finance/sample`,
      content: t("SAMPLE_SCREEN"),
      show: pathVar.includes("sample"),
    },
  ];
  return <BreadCrumb className="finance-bredcrumb" crumbs={crumbs} spanStyle={{ maxWidth: "min-content" }} />;
};

const FinanceApp = ({ path }) => {
  const location = useLocation();
  const accountOptions = [
    { code: "acc1", name: "Cash Account 1" },
    { code: "acc2", name: "Cash Account 2" },
  ];

  const yearOptions = [
    { code: "2023-24", name: "2023–24" },
    { code: "2024-25", name: "2024–25" },
  ];

  const handleSearch = (formValues) => {
    console.log("Search Submitted:", formValues);
    // API Call or logic here
  };


  const handleClose = () => {
    console.log("Close clicked");
    window.history.back();
  };
  //  const navigate = useNavigate();

  // const handleAddClick = () => {
  //   navigate("/configuration-setup/add-closing-balance");
  // };
  
  return (
    <React.Fragment>
      <FinanceBreadCrumb location={location} defaultPath={path} />
      <Switch>
        <AppContainer className="finance">
          <PrivateRoute path={`${path}/sample`} component={() => <div>Hello World</div>} />
          <PrivateRoute exact path={`${path}/voucher/journalVoucher`} component={() => <ReceiptNewform />} />
          <PrivateRoute exact path={`${path}/inbox`} component={() => <Inbox />} />

          {/* -------------------------------PRABHU-SSPL--------------------------------------- */}

          {/* Expenditure Accounting */}

          {/* - Bills Accounting */}

          <PrivateRoute path={`${path}/expensebill/newform`} component={() => <ExpenseBillNewform />} />
          <PrivateRoute path={`${path}/bill-voucher/billvoucherform`} component={() => <BillVoucherForm />} />
          <PrivateRoute path={`${path}/bill-register/billregistersearch`} component={() => <BillRegisterSearch />} />
          <PrivateRoute path={`${path}/contractor-bill/newform`} component={() => <ContractorNewform />} />
          <PrivateRoute path={`${path}/supplier-bill/newform`} component={() => <SupplierNewform />} />

          {/* - Payments */}

          <PrivateRoute path={`${path}/direct-bank-payment/DirectBankPayment-Form`} component={() => <DirectBankPaymentForm />} />
          <PrivateRoute path={`${path}/rtgs-assignment/ChequeAssignment-beforeRtgsSearch`} component={() => <ChequeAssignmentBeforeRtgsSearch />} />
          <PrivateRoute path={`${path}/bll-payments/Payment-beforeSearch`} component={() => <PaymentBeforeSearch />} />
          <PrivateRoute path={`${path}/cheque-assignment/ChequeAssignmentBeforeSearch`} component={() => <ChequeAssignmentBeforeSearch />} />
          <PrivateRoute path={`${path}/surrender-cheque/BeforeSearchForSurrender`} component={() => <BeforeSearchForSurrender />} />
          <PrivateRoute path={`${path}/surrender-rtgs-search/BeforeSearchForRTGSSurrender`} component={() => <BeforeSearchForRTGSSurrender />} />

          {/* Report Generation */}

           {/* - MIS Reports */}
            <PrivateRoute path={`${path}/reports/mis-reports/chequeIssueRegisterReport`} component={() => <ChequeIssueRegisterReport />} />
            <PrivateRoute path={`${path}/reports/mis-reports/voucherStatusReport-beforeSearch`} component={() => <VoucherStatusReportBeforeSearch />} />
            <PrivateRoute path={`${path}/reports/mis-reports/billRegisterReport-searchform`} component={() => <BillRegisterReportSearch/>} />
            <PrivateRoute path={`${path}/reports/mis-reports/bankAdviceReport-newForm`} component={() => <BankAdviceReportNewForm />} />
            <PrivateRoute path={`${path}/reports/mis-reports/rtgsIssueRegisterReport-newForm`} component={() => <RtgsIssueRegisterReportNewForm />} />
            <PrivateRoute path={`${path}/reports/mis-reports/surrendered-cheque`} component={() => <SurrenderedCheque />} />
            <PrivateRoute path={`${path}/reports/mis-reports/dishonouredcheque`} component={() => <Dishonouredcheque />} />


             {/* - Accounting Records */}

             <PrivateRoute path={`${path}/reports/accounting-records/TrialBalance`} component={() => <TrialBalance />} />
             <PrivateRoute path={`${path}/reports/accounting-records/GeneralLedgerReport`} component={() => <GeneralLedgerReport/>} />
             <PrivateRoute path={`${path}/reports/accounting-records/SubLedgerScheduleReport`} component={() => <SubLedgerScheduleReport />} />
             <PrivateRoute path={`${path}/reports/accounting-records/SubLedgerReport`} component={() => <SubLedgerReport />} />
             <PrivateRoute path={`${path}/reports/accounting-records/DayBookReport`} component={() => <DayBookReport />} />
             <PrivateRoute path={`${path}/reports/accounting-records/JournalBookReport`} component={() => <JournalBookReport />} />
             <PrivateRoute path={`${path}/reports/accounting-records/OpeningBalanceReport`} component={() => <OpeningBalanceReport />} />
             


          {/* ------------------------------RAHUL-SSPL--------------------------------------- */}

          <PrivateRoute exact path={`${path}/report/receiptPaymentReport-newForm`} component={() => <ReceiptPaymentReport />} />
          <PrivateRoute exact path={`${path}/report/cashFlowReport-generateCashFlowReport`} component={() => <CashFlowReport />} />
          <PrivateRoute exact path={`${path}/bankstatement/search`} component={() => <BankStatementSearch />} />

          <PrivateRoute exact path={`${path}/brs/autoReconciliation-newForm`} component={() => <AutoBankReconciliation />} />
          <PrivateRoute exact path={`${path}/brs/bank-reconciliation-upload`} component={() => <AutoBankReconciliationUpload />} />
          <PrivateRoute exact path={`${path}/brs/bank-reconciliation-summary-report`} component={() => <BankReconciliationSummary />} />
          <PrivateRoute exact path={`${path}/brs/bank-entries-not-in-bank-book`} component={() => <BankEntriesNotInBankBook />} />
          <PrivateRoute exact path={`${path}/brs/manual-bank-reconciliation`} component={() => <ReconcileWithBankManual />} />
          <PrivateRoute exact path={`${path}/brs/work-order/create-work-order-master-form`} component={() => <CreateWorkOrderMasterForm />} />
          <PrivateRoute exact path={`${path}/brs/purchase-order/create-work-order-master`} component={() => <PurchaseWorkOrderMaster />} />
          <PrivateRoute exact path={`${path}/brs/revenue-accounting/Create-Miscellaneous-Receipt`} component={() => <CreateMiscellaneousReceipt />} />
          <PrivateRoute
            exact
            path={`${path}/brs/revenue-accounting/cash-remittance-form`}
            component={() => (
              <RemittanceForm
                title="Cash Remittance1111"
                accountOptions={accountOptions}
                financialYearOptions={yearOptions}
                onSearch={handleSearch}
              />
            )}
          />
          <PrivateRoute
            exact
            path={`${path}/brs/revenue-accounting/cheque-remittance-form`}
            component={() => (
              <RemittanceForm title="Cheque Remittance" accountOptions={accountOptions} financialYearOptions={yearOptions} onSearch={handleSearch} />
            )}
          />
          <PrivateRoute exact path={`${path}/brs/revenue-accounting/search-receipts`} component={() => <SearchReceipts />} />
          <PrivateRoute exact path={`${path}/configuration-setup/opening-balance`} component={() => <OpeningBalanceForm />} />
          <PrivateRoute exact path={`${path}/configuration-setup/transfer-closing-balance`} component={() =>    <SearchBox title="Transfer Closing Balance" />} />
          <PrivateRoute exact path={`${path}/configuration-setup/close-financial-year`} component={() => <SearchBox title="Search Opening Balance" />} />
          <PrivateRoute exact path={`${path}/configuration-setup/close-period`} component={() => <ClosedPeriodForm/>} />

          <PrivateRoute exact path={`${path}/configuration-setup/add-closing-balance`} component={() => <JournalVoucher/>} /> 
          

          {/* ------------------------------PULKIT-SSPL--------------------------------------- */}

          {/* adding routes for create budget group and definition here */}
          {/* <PrivateRoute exact path={`${path}/create-budget-group`} component={() => <CreateBudgetGroup />} />
          <PrivateRoute exact path={`${path}/create-budget-definition`} component={() => <CreateBudgetDefinition />} />

          {/* adding search budget here */}
           {/* <PrivateRoute exact path={`${path}/search-budget`} component={() => <SearchBudget />} />  */}

          {/* Add more finance routes here as needed */}
        </AppContainer>
      </Switch>
    </React.Fragment>
  );
};

export default FinanceApp;
