import React from "react";
import { useRouteMatch } from "react-router-dom";
import ContraCard from "./components/ContraCard";
import ContraApp from "./pages";

export const ContraModule = ({ stateCode, userType, tenants }) => {
  const moduleCode = "Contra";
  const language = Digit.StoreData.getCurrentLanguage();
  const { isLoading, data: store } = Digit.Services.useStore({ stateCode, moduleCode, language });

  Digit.SessionStorage.set("FINANCE_TENANTS", tenants);
  const { path, url } = useRouteMatch();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceEmployee = userRoles.includes("EMPLOYEE");

  if (!isFinanceEmployee) return null;
  if (userType === "employee") {
    return <ContraApp path={path} url={url} />;
  } else return null;
};

const componentsToRegister = {
  ContraCard,
  ContraModule,
};

export const initContraComponents = () => {
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};
