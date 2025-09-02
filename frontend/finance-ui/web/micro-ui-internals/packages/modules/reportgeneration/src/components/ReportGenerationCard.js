import { EmployeeModuleCard, FinanceChartIcon } from "@mcd89/finance-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";

const ReportGenerationCard = () => {
  const { t } = useTranslation();

  const userRoles = Digit.UserService.getUser()?.info?.roles?.map((role) => role.code) || [];
  const isFinanceUser = userRoles.includes("EMPLOYEE");

  if (!isFinanceUser) return null;
  const propsForModuleCard = {
    Icon: <FinanceChartIcon />,
    moduleName: t("ACTION_TEST_REPORT_GENERATION").toUpperCase(),
    links: [
      {
        label: t("REPORT_GENERATION"),
        link: `/${window?.contextPath}/employee/budget/budget`,
      },
    ],
  };

  return <EmployeeModuleCard {...propsForModuleCard} />;
};

export default ReportGenerationCard;
