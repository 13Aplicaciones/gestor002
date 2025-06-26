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

  /**
   * Inicializar token y parámetros de URL
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp.access_token);

      const parameter: IParameter = await getParameter(MODULE, "200");
      setApiUrl(
        parameter.valueText01 + Menus.COMBO_ITEM_ENDPOINT + "/paginated"
      );
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
    return   status + " " + new Date().toISOString();
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
        onCancel={() => {
          console.log("Consulta cancelada");
          setVerLOV(false);
        }}
      />
      <GenericQueryForm<ComboItemQueryFormValues>
        validationSchema={schema}
        defaultValues={{
          indexComboItem: "",
          label: "",
        }}
        onFind={onFind}
        renderFields={({ register, formState, setValue }) => (
          <>
            <InputFieldLov
              onFind={() => {
                setValue("indexComboItem", handleOnFind());
              }}
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
