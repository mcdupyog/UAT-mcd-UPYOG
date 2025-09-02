import React from "react";
import { useRouteMatch } from "react-router-dom";
import ExpenditureAccountingApp from "./pages";
import ExpenditureAccountingCard from "./components/ExpenditureAccountingCard";

export const ExpenditureAccountingModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "ExpenditureAccounting";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <ExpenditureAccountingApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  ExpenditureAccountingCard,
  ExpenditureAccountingModule,
};

export const initExpenditureAccountingComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
