import React, { useState, useEffect } from "react";
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
  Table,
  RadioButtons,
} from "@egovernments/digit-ui-react-components";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { TableConfig } from "../../config/table-config";
const SearchBudget = () => {
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
  const optionsRadioButtons = [
    { code: "YES", label: "Yes" },
    { code: "NO", label: "No" },
  ];

  const budgetingTypeOptions = [
    {
      i18nKey: "All",
      code: "ALL",
      colourCode: "RR", // dummy value
      active: true,
    },
    {
      i18nKey: "Debit",
      code: "DEBIT",
      colourCode: "RE", // dummy value
      active: true,
    },
    {
      i18nKey: "Credit",
      code: "CREDIT",
      colourCode: "CR", // dummy value
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
  const [selectedBudgettingType, setSelectedBudgettingType] = useState(null);
  const [selectedMajorCode, setSelectedMajorCode] = useState(null);
  const [selectedDetailedMinCode, setSelectedDetailedMinCode] = useState(null);
  const [selectedDetailedMaxCode, setSelectedDetailedMaxCode] = useState(null);
  const [selectedViewName, setSelectedViewName] = useState(null);
  const [selectedModifyName, setSelectedModifyName] = useState(null);
  const [data, setData] = useState([]); // Empty data
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [selectedRadioButton, setSelectedRadioButton] = useState(null);
  const config = TableConfig(t).Finance2;
  const columns = config.inboxColumns();

  useEffect(() => {
    setData([]);
    setShowTable(true);
  }, []);

  return (
    <React.Fragment>
      <Header className="works-header-search">{t("FINANCE_SEARCH_BUDGET")}</Header>
      <Card>
        <div style={{ marginBottom: "16px" }}>
          <div style={{ padding: "16px", marginTop: "8px" }}>
            {/* Financial Year */}
            <LabelFieldPair>
              <CardLabel className="card-label-smaller">{t("FINANCE_FINANCIAL_YEAR *")}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name="name"
                  rules={{
                    required: t("CORE_COMMON_REQUIRED_ERRMSG"),
                    validate: { pattern: (val) => (/^[a-zA-Z0-9/-\s]*$/.test(val) ? true : t("ERR_DEFAULT_INPUT_FIELD_MSG")) },
                  }}
                  render={(props) =><Dropdown
                      className="form-field"
                      selected={selectedAccountType}
                      select={setSelectedAccountType}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={accountTypeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />}
                />
                 <div style={{ marginBottom: "24px" }}></div>
              </div>
            </LabelFieldPair>

            {/* Budget */}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_BUDGET")}`}</CardLabel>
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
            {/* Fund */}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_FUND")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"budgettingType"}
                  defaultValue={selectedBudgettingType}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedBudgettingType}
                      select={setSelectedBudgettingType}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={budgetingTypeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>

            <div style={{ marginBottom: "24px" }}></div>
            {/* Executing Department */}
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_EXECUTING_DEPARTMENT")}`}</CardLabel>
              <div className="field" >
                <Controller
                  control={control}
                  name={"useMajorCode"}
                  defaultValue={selectedMajorCode}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                     <Dropdown
                      className="form-field"
                      selected={selectedBudgettingType}
                      select={setSelectedBudgettingType}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={budgetingTypeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
           
            {/* Function*/}
             <div style={{ marginBottom: "24px" }}></div>
            <LabelFieldPair>
              <CardLabel>{`${t("FINANCE_FUNCTION")}`}</CardLabel>
              <div className="field">
                <Controller
                  control={control}
                  name={"detailedMinCode"}
                  defaultValue={selectedMajorCode}
                  rules={{ required: t("CORE_COMMON_REQUIRED_ERRMSG") }}
                  render={(props) => (
                    <Dropdown
                      className="form-field"
                      selected={selectedDetailedMinCode}
                      select={setSelectedDetailedMinCode}
                      optionCardStyles={{ overflowY: "auto", maxHeight: "300px" }}
                      option={detailedMinCodeOptions}
                      optionKey="i18nKey"
                      t={t}
                      placeholder={"Select"}
                    />
                  )}
                />
              </div>
            </LabelFieldPair>
            <div style={{ marginBottom: "24px" }}></div>
           
           
            {/* Buttons */}
            <div style={{ display: "flex", gap: "150px", marginTop: "25px" }}>
              <Button label="Search" />
              <Button label="Close" />
            </div>
          </div>
        </div>
      </Card>
      {/* <div>
        <Header className="works-header-search">{t("FINANCE_VIEW_BUDGET_GROUP")}</Header>
        <Card>
          <div style={{ display: "flex", gap: "150px", marginTop: "25px" }}></div>
          {showTable && (
            <ApplicationTable
              t={t}
              data={data}
              columns={columns}
              totalRecords={data.length} // fetched from config
              currentPage={0}
              pageSizeLimit={10}
              onNextPage={() => {}}
              onPrevPage={() => {}}
            />
          )}
        </Card>
      </div> */}

     
    </React.Fragment>
  );
};

export default SearchBudget;
