import React from "react";
import { Switch, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AppContainer, BreadCrumb } from "@egovernments/digit-ui-react-components";

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

const ReportGenerationApp = ({ path }) => {
  const location = useLocation();

  return (
    <React.Fragment>
      <FinanceBreadCrumb location={location} defaultPath={path} />
      <Switch>
        <AppContainer className="finance">dsdfd</AppContainer>
      </Switch>
    </React.Fragment>
  );
};

export default ReportGenerationApp;
