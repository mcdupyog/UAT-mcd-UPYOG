import React from "react";
import { useRouteMatch } from "react-router-dom";
import AdministrationCard from "./components/AdministrationCard"
import AdministrationApp from "./pages";

export const AdministrationModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "Administration";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <AdministrationApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  AdministrationCard,
  AdministrationModule,
};

export const initAdministrationComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
