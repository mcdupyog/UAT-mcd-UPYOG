import React from "react";
import { useRouteMatch } from "react-router-dom";
import BudgetApp from "./pages";
import BudgetCard from "./components/BudgetCard";

export const BudgetModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "Budget";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <BudgetApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  BudgetCard,
  BudgetModule,
};

export const initBudgetComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
