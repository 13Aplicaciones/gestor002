import {
  getParameter,
  IParameter,
} from "orchestrator_remote/service/Parameter";
import {
  getToken,
  ITokenRoot,
  refreshToken,
} from "orchestrator_remote/service/Tokens";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  Direction,
  GenericQueryForm,
  InputField,
  InputFieldLov,
  IParametersQuery,
  PopUpLov,
  QueryLov,
} from "ux-ui";
import * as yup from "yup";
import { Menus, MODULE } from "../../utils/Constants";

interface ComboItemQueryFormValues {
  indexComboItem: string;
  label: string;
}

/**
 * Formulario de consulta de ComboItemes del sistema.
 */
const QueryFormComboItem = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [t] = useTranslation("global_gestor");
  const [apiUrl, setApiUrl] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);
  const [verLOV, setVerLOV] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] =
    useState<ComboItemQueryFormValues>({
      indexComboItem: "",
      label: "",
    });

  const [count, setCount] = useState<number>(0);

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(parameter.valueText01 + Menus.COMBO_ITEM_ENDPOINT + "/lov");
    };

    initializeStructure();
  }, []);

  const schema = yup.object({
    indexComboItem: yup.string().max(128, t("validation.max", { max: 128 })),
    label: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  const handleOnFind = () => {
    const status = verLOV;
    setVerLOV(!status);
  };

  return (
    <>
      <PopUpLov
        createIRowDataCustom={() => ({
          indexComboItem: "",
          label: "",
        })}
        QueryLovPanel={QueryLov}
        initialRow={{ indexComboItem: "", label: "" }}
        getToken={refreshToken}
        apiUrlLov={apiUrl}
        token={token}
        visible={verLOV}
        onSelectRow={(row) => {
          console.log("Fila seleccionada:", row);
          setVerLOV(false);
        }}
        presentations={{
          valueInteger: false,
          valueDecimal: false,
          labelAlternative: true,
        }}
        onCancel={() => {
          console.log("Consulta cancelada");
          setVerLOV(false);
          setCount(count + 1);
          const temp = selectedValues;
          setSelectedValues({
            indexComboItem: "hola" + (count + 1),
            label: temp.label,
          });
        }}
      />
      <GenericQueryForm<ComboItemQueryFormValues>
        key={`${selectedValues.indexComboItem}-${selectedValues.label}`}
        validationSchema={schema}
        defaultValues={selectedValues}
        onFind={onFind}
        renderFields={({ register, formState }) => (
          <>
            <InputFieldLov
              onFind={() => handleOnFind()}
              title={t("modules.GS-CB-IT-001.fields.indexComboItem.title")}
              columns={BandPresentation.column_3}
              placeholder={t(
                "modules.GS-CB-IT-001.fields.indexComboItem.placeholder"
              )}
              directionLabel={Direction.horizontal}
              register={register("indexComboItem")}
              messageError={formState.errors.indexComboItem?.message}
            />

            <InputField
              title={t("modules.GS-CB-IT-001.fields.label.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-CB-IT-001.fields.label.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("label")}
              messageError={formState.errors.label?.message}
            />
          </>
        )}
      />
    </>
  );
};

export { QueryFormComboItem };
