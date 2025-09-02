import React from "react";
import { useRouteMatch } from "react-router-dom";
import ReportGenerationApp from "./pages";
import ReportGenerationCard from "./components/ReportGenerationCard";

export const ReportGenerationModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "ReportGeneration";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <ReportGenerationApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  ReportGenerationCard,
  ReportGenerationModule,
};

export const initReportGenerationComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
