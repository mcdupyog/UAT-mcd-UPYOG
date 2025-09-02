import React from "react";
import { useRouteMatch } from "react-router-dom";
import JVApp from "./pages";
import JVCard from "./components/JVCard";

export const JVModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "JV";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <JVApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  JVCard,
  JVModule,
};

export const initJVComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
