import { EmployeeModuleCard, FinanceChartIcon } from "@mcd89/finance-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const BudgetCard = () => {
  const { t } = useTranslation();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceUser = userRoles.includes("EMPLOYEE");

  if (!isFinanceUser) return null;
  // if (!Digit.Utils.budgetAccess()) {
  //   return null;
  // }

  // const budget_CEMP = Digit.UserService.hasAccess(["EGF_BILL_CREATOR","EGF_BILL_APPROVER"]) || false;
  const propsForModuleCard = {
    Icon: <FinanceChartIcon />,
    moduleName: t("ACTION_TEST_BUDGET").toUpperCase(),
    links: [
      // ---------------------------------START PULKIT-SSPL----------------------------------------
      // {
      //   label: t("FINANCE_CREATE_BUDGET_GROUP"),
      //   link: `/${window?.contextPath}/employee/budget/create-budget-group`,
      //   //   roles: ROLES.WORKFLOW,
      // },
      // {
      //   label: t("FINANCE_CREATE_BUDGET_DEFINITION"),
      //   link: `/${window?.contextPath}/employee/budget/create-budget-definition`,
      //   //   roles: ROLES.WORKFLOW,
      // },

      {
        label: t("Budget"),
        link: `/${window?.contextPath}/employee/budget/budget`,
        //   roles: ROLES.WORKFLOW,
      },

    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default BudgetCard;
