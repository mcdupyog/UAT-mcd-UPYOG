import React, { useEffect } from "react";
import { Switch, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PrivateRoute, AppContainer, BreadCrumb } from "@egovernments/digit-ui-react-components";
import SearchBudget from "./employee/SearchBudget";
import CreateBudgetDefinition from "./employee/CreateBudgetDefinition";
import CreateBudgetGroup from "./employee/CreateBudgetGroup";
import CreateBudgetCard from "./employee/CreateBudgetCard";

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

const BudgetApp = ({ path }) => {
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
          {/* ------------------------------PULKIT-SSPL--------------------------------------- */}

          <PrivateRoute path={`${path}/budget`} component={() => <CreateBudgetCard />} />
          <PrivateRoute path={`${path}/create-budget-group`} component={CreateBudgetGroup} />
          <PrivateRoute exact path={`${path}/create-budget-definition`} component={() => <CreateBudgetDefinition />} />
          <PrivateRoute exact path={`${path}/search-budget`} component={() => <SearchBudget />} />
        </AppContainer>
      </Switch>
    </React.Fragment>
  );
};

export default BudgetApp;
