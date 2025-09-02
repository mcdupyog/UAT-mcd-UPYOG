import React, { useState } from "react";
import {
  TextInput,
  CardLabel,
  Dropdown,
  Card,
  TextArea,
  CheckBox,
  Button,
  LabelFieldPair,
  Header,
  Label,
} from "@egovernments/digit-ui-react-components";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
const CreateBudgetDefinition = () => {
  const { t } = useTranslation();
  const accountTypeOptions = [
    {
      i18nKey: "Revenue Receipts",
      code: "REVENUE_RECEIPTS",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "Revenue Expenditure",
      code: "REVENUE_EXPENDITURE",
      colourCode: "RE", // dummy value
      active: true,
    },
    {
      i18nKey: "Capital Receipts",
      code: "CAPITAL_RECEIPTS",
      colourCode: "CR", // dummy value
      active: true,
    },
    {
      i18nKey: "Capital Expenditure",
      code: "CAPITAL_EXPENDITURE",
      colourCode: "CE", // dummy value
      active: true,
    },
  ];

  const financialYearOptions = [
    {
      i18nKey: "2025-26",
      code: "2025-26",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "2024-25",
      code: "2024-25",
      colourCode: "RE", // dummy value
      active: true,
    },
  ];

  const majorCodeOptions = [
    {
      i18nKey: "110---Tax Revenue",
      code: "110---TAX REVENUE",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "120---Fees & User Charges",
      code: "120---FEES & USER CHARGES",
      colourCode: "RE", // dummy value
      active: true,
    },
  ];

  const detailedMinCodeOptions = [
    {
      i18nKey: "1100101---Property Tax-Properties General",
      code: "1100101---Property Tax-Properties--General",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "1100102---Property Tax-Vacant Land",
      code: "1100102---Property Tax-Vacant Land",
      colourCode: "RE", // dummy value
      active: true,
    },
  ];

  const detailedMaxCodeOptions = [
    {
      i18nKey: "1100101---Property Tax-PROPERTIES--GENERAL",
      code: "1100101---Property Tax-Properties--General",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "1100102---Property Tax-Vacant Land",
      code: "1100102---Property Tax-Vacant Land",
      colourCode: "RE", // dummy value
      active: true,
    },
  ];
  const { control } = useForm();
  const [selectedName, setSelectedName] = useState("");
  const [selectedAccountType, setSelectedAccountType] = useState(null);
  const [selectedFinancialYear, setSelectedFinancialYear] = useState(null);
  const [selectedParent, setSelectedParent] = useState(null);
  const [selectedBudgetRevisedEstimate, setSelectedBudgetRevisedEstimate] = useState(null);
  const [selectedModifyName, setSelectedModifyName] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedActiveBudget, setSelectedActiveBudget] = useState(null);
  const [selectedPrimaryBudget, setSelectedPrimaryBudget] = useState(null);
  const [selectedReferenceBudget, setSelectedReferenceBudget] = useState(null);
  return (
    <React.Fragment>
      <Header className="works-header-search">{t("FINANCE_CREATE_BUDGET_DEFINITION")}</Header>
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ padding: "16px", marginTop: "8px" }}>
            {/* Name*/}
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("FINANCE_CREATE_BUDGET_NAME ")}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) => <TextInput value={selectedName} style={{ marginTop: "20px", width: "400px" }} />}
                />
              </div>
            </LabelFieldPair>

            {/* Budget/Revised Estimate*/}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_BUDGET_REVISED_ESTIMATE")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"accountType"}
                  defaultValue={selectedAccountType}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedAccountType}
                      select={setSelectedAccountType}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={accountTypeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>

            <div style={{ marginBottom: "24px" }}></div>
            {/* Financial Year */}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_FINANCIAL YEAR")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"financialYear"}
                  defaultValue={selectedFinancialYear}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedFinancialYear}
                      select={setSelectedFinancialYear}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={financialYearOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>

            <div style={{ marginBottom: "24px" }}></div>
            {/* Parent*/}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_PARENT")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"parent"}
                  defaultValue={selectedParent}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedParent}
                      select={setSelectedParent}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={majorCodeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <div style={{ marginBottom: "24px" }}></div>

            {/* Description*/}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_DESCRIPTION")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"description"}
                  defaultValue={selectedDescription}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => <TextArea />}
                />
              </div>
            </LabelFieldPair>
            <div style={{ marginBottom: "24px" }}></div>
            {/* Active Budget */}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_ACTIVE_BUDGET")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"detailedMaxCode"}
                  defaultValue={selectedActiveBudget}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => <CheckBox />}
                />
              </div>
            </LabelFieldPair>

            <div style={{ marginBottom: "24px" }}></div>
            {/* Primary Budget */}
            <LabelFieldPair>
              <CardLabel>{t("FINANCE_PRIMARY_BUDGET")}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"parent"}
                  defaultValue={selectedPrimaryBudget}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => <CheckBox />}
                />
              </div>
            </LabelFieldPair>
            <div style={{ marginBottom: "24px" }}></div>
            {/* Reference Budget*/}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_REFERENCE_BUDGET")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"parent"}
                  defaultValue={selectedReferenceBudget}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedReferenceBudget}
                      select={setSelectedReferenceBudget}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={majorCodeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>

            {/* Buttons */}
            <div style={{ display: "flex", gap: "150px", marginTop: "25px" }}>
              <Button label="Create" />
              <Button label="Close" />
            </div>
          </div>
        </div>
      </Card>
      <div>
        <Header className="works-header-search">{t("FINANCE_VIEW_BUDGET_DEFINITION")}</Header>
        <Card>
          <LabelFieldPair>
            <CardLabel>{t("FINANCE_VIEW_BUDGET_DEFINITION")}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <Dropdown
                    className="form-field"
                    selected={selectedFinancialYear}
                    select={setSelectedFinancialYear}
                    optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                    option={financialYearOptions}
                    optionKey="i18nKey"
                    t={t}
                    placeholder={"Select"}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <div style={{ marginBottom: "24px" }}></div>
          <LabelFieldPair>
            <CardLabel>{t("FINANCE_BUDGET_REVISED_ESTIMATE")}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <Dropdown
                    className="form-field"
                    selected={selectedBudgetRevisedEstimate}
                    select={setSelectedBudgetRevisedEstimate}
                    optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                    option={financialYearOptions}
                    optionKey="i18nKey"
                    t={t}
                    placeholder={"Select"}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          {/* Buttons */}
          <div style={{ display: "flex", gap: "150px", marginTop: "25px" }}>
            <Button label="Search" />
            <Button label="Close" />
          </div>
        </Card>
      </div>

      <div>
        <Header className="works-header-search">{t("FINANCE_MODIFY_BUDGET_GROUP")}</Header>
        <Card>
          <LabelFieldPair>
            <CardLabel>{t("FINANCE_VIEW_BUDGET_DEFINITION")}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <Dropdown
                    className="form-field"
                    selected={selectedFinancialYear}
                    select={setSelectedFinancialYear}
                    optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                    option={financialYearOptions}
                    optionKey="i18nKey"
                    t={t}
                    placeholder={"Select"}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          <div style={{ marginBottom: "24px" }}></div>
          <LabelFieldPair>
            <CardLabel>{t("FINANCE_BUDGET_REVISED_ESTIMATE")}</CardLabel>
            <div className="field">
              <Controller
                control={control}
                name="name"
                rules={{
                  required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                  validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                }}
                render={(props) => (
                  <Dropdown
                    className="form-field"
                    selected={selectedBudgetRevisedEstimate}
                    select={setSelectedBudgetRevisedEstimate}
                    optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                    option={financialYearOptions}
                    optionKey="i18nKey"
                    t={t}
                    placeholder={"Select"}
                  />
                )}
              />
            </div>
          </LabelFieldPair>
          {/* Buttons */}
          <div style={{ display: "flex", gap: "150px", marginTop: "25px" }}>
            <Button label="Search" />
            <Button label="Close" />
          </div>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CreateBudgetDefinition;
