import React from "react";
import { initLibraries } from "@egovernments/digit-ui-libraries";
import {
  paymentConfigs,
  PaymentLinks,
  PaymentModule,
} from "@egovernments/digit-ui-module-common";
import { DigitUI } from "@egovernments/digit-ui-module-core";
import { initDSSComponents } from "@egovernments/digit-ui-module-dss";
import { initEngagementComponents } from "@egovernments/digit-ui-module-engagement";
import { initHRMSComponents } from "@egovernments/digit-ui-module-hrms";
import { initUtilitiesComponents } from "@egovernments/digit-ui-module-utilities";
import { UICustomizations } from "./Customisations/UICustomizations";
import {
  FinanceModule,
  initFinanceComponents,
} from "@mcd89/digit-ui-module-finance2";
import {
  BudgetModule,
  initBudgetComponents,
} from "@mcd89/digit-ui-module-budget";

// adding journal voucher components here

import { JVModule, initJVComponents } from "@mcd89/digit-ui-module-jv";

import {
  AdministrationModule,
  initAdministrationComponents,
} from "@mcd89/digit-ui-module-administration";
import {
  ConfigurationSetupModule,
  initConfigurationSetupComponents,
} from "@mcd89/digit-ui-module-configurationsetup";
import {
  ContraModule,
  initContraComponents,
} from "@mcd89/digit-ui-module-contra";
import {
  ReportGenerationModule,
  initReportGenerationComponents,
} from "@mcd89/digit-ui-module-reportgeneration";
import {
  RevenueAccountingModule,
  initRevenueAccountingComponents,
} from "@mcd89/digit-ui-module-revenueaccounting";

// import { initWorkbenchComponents } from "@nudmcdgnpm/digit-ui-module-workbench";
import {
  initPGRComponents,
  PGRReducers,
} from "@egovernments/digit-ui-module-pgr";
import { ExpenditureAccountingModule, initExpenditureAccountingComponents } from "@mcd89/digit-ui-module-expenditureAccounting";

window.contextPath = window?.globalConfigs?.getConfig("CONTEXT_PATH");

const enabledModules = [
  "DSS",
  "NDSS",
  "Utilities",
  "Finance2",
  "HRMS",
  "Budget",
  "JV",
  "Administration",
  "ConfigurationSetup",
  "Contra",
  "ReportGeneration",
  "RevenueAccounting",
  "ExpenditureAccounting",
  // "Engagement",
  // "Workbench",
  "PGR",
];

const moduleReducers = (initData) => ({
  initData,
  pgr: PGRReducers(initData),
});

const initDigitUI = () => {
  window.Digit.ComponentRegistryService.setupRegistry({
    PaymentModule,
    FinanceModule,
    ...paymentConfigs,
    PaymentLinks,
    BudgetModule,
    JVModule,
    AdministrationModule,
    ConfigurationSetupModule,
    ContraModule,
    ReportGenerationModule,
    RevenueAccountingModule,
    ExpenditureAccountingModule,
  });

  initPGRComponents();
  initDSSComponents();
  initHRMSComponents();
  initEngagementComponents();
  initUtilitiesComponents();
  //  initWorkbenchComponents();
  initExpenditureAccountingComponents();
  initFinanceComponents();
  initBudgetComponents();
  initJVComponents();
  initAdministrationComponents();
  initConfigurationSetupComponents();
  initContraComponents();
  initReportGenerationComponents();
  initRevenueAccountingComponents();

  window.Digit.Customizations = {
    PGR: {},
    commonUiConfig: UICustomizations,
  };
};

initLibraries().then(() => {
  initDigitUI();
});

function App() {
  window.contextPath = window?.globalConfigs?.getConfig("CONTEXT_PATH");
  const stateCode =
    window.globalConfigs?.getConfig("STATE_LEVEL_TENANT_ID") ||
    process.env.REACT_APP_STATE_LEVEL_TENANT_ID;
  if (!stateCode) {
    return <h1>stateCode is not defined</h1>;
  }
  return (
    <DigitUI
      stateCode={stateCode}
      enabledModules={enabledModules}
      moduleReducers={moduleReducers}
      // defaultLanding="employee"
    />
  );
}

export default App;
