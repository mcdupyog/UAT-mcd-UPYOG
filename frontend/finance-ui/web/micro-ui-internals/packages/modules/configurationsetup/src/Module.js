import React from "react";
import { useRouteMatch } from "react-router-dom";
import ConfigurationSetupCard from "./components/ConfigurationSetupCard";
import ConfigurationSetupApp from "./pages";

export const ConfigurationSetupModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "ConfigurationSetup";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <ConfigurationSetupApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  ConfigurationSetupCard,
  ConfigurationSetupModule,
};

export const initConfigurationSetupComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
