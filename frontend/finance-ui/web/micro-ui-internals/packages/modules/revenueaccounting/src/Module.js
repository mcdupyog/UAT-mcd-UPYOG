import React from "react";
import { useRouteMatch } from "react-router-dom";
import RevenueAccountingCard from "./components/RevenueAccountingCard";
import RevenueAccountingApp from "./pages";

export const RevenueAccountingModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "RevenueAccounting";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <RevenueAccountingApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  RevenueAccountingCard,
  RevenueAccountingModule,
};

export const initRevenueAccountingComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
