/* eslint-disable @typescript-eslint/no-explicit-any */
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
  indexComboItemDescription?: string;
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
      setApiUrl(parameter.valueText01 + Menus.COMBO_ITEM_ENDPOINT + "/lov");
    };

    initializeStructure();
  }, []);

  const schema = yup.object({
    indexComboItem: yup.string().required(t("validation.required")),
    indexComboItemDescription: yup.string(),
    label: yup.string().max(1024, t("validation.max", { max: 1024 })),
  });

  /**
   * Maneja el evento de búsqueda del LOV.
   */
  const handleOnFind = () => {
    const status = verLOV;
    setVerLOV(!status);
  };

  /**
   * Maneja la selección de una fila del LOV
   */
  const handleLovSelection = (row: any) => {
    console.log("handleLovSelection", row);
    // Aquí puedes manejar la selección de la fila del LOV
    // indexComboItem: row.index ?? "",
    // indexComboItemDescription: row.label ?? "",
    // label: "",

    setVerLOV(false);
  };

  /**
   * Maneja la cancelación del LOV
   */
  const handleLovCancel = () => {
    setVerLOV(false);
  };

  return (
    <>
      <PopUpLov
        createIRowDataCustom={() => ({
          indexComboItem: "",
          indexComboItemDescription: "",
          label: "",
        })}
        QueryLovPanel={QueryLov}
        initialRow={{ indexComboItem: "", label: "" }}
        getToken={refreshToken}
        apiUrlLov={apiUrl}
        token={token}
        visible={verLOV}
        onSeeRow={handleLovSelection}
        presentations={{
          valueInteger: false,
          valueDecimal: false,
          labelAlternative: true,
        }}
        onCancel={handleLovCancel}
      />
      <GenericQueryForm<ComboItemQueryFormValues>
        validationSchema={schema}
        defaultValues={{
          indexComboItem: "",
          indexComboItemDescription: "",
          label: "",
        }}
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
              registerDescription={register("indexComboItemDescription")}
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
