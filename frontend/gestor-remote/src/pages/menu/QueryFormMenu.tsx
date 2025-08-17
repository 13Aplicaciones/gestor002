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

/**
 * Valores del formulario de consulta de menú.
 */
interface MenuQueryFormValues {
  uuidModule: string;
  uuidModuleDescription?: string;
  name: string;
}

/**
 * Formulario de consulta de informaciones del sistema.
 */
const QueryFormMenu = ({
  onFind,
}: {
  onFind: (data: IParametersQuery) => void;
}) => {
  const [apiUrl, setApiUrl] = useState("");
  const [formApi, setFormApi] = useState<any>(null);
  const [lovSelected, setLovSelected] = useState<any>(null);
  const [t] = useTranslation("global_gestor");
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
      setApiUrl(parameter.valueText01 + Menus.MENU_ENDPOINT + "/lov-module");
    };

    initializeStructure();
  }, []);

  /**
   * Efecto para manejar la selección del LOV y actualizar el formulario.
   */
  useEffect(() => {
    if (lovSelected && formApi) {
      formApi.setValue("uuidModule", lovSelected.index ?? "");
      formApi.setValue("uuidModuleDescription", lovSelected.label ?? "");
      formApi.setValue("label", "");

      console.log("Formulario actualizado con LOV seleccionado:", lovSelected);
      setLovSelected(null); // Limpia para evitar loops
    }
  }, [lovSelected, formApi]);

  /**
   * Esquema de validación para el formulario.
   */
  const schema = yup.object({
    uuidModule: yup.string(),
    uuidModuleDescription: yup.string(),
    name: yup.string().max(128, t("validation.max", { max: 128 })),
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
    setLovSelected(row);
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
          uuidModule: "",
          uuidModuleDescription: "",
          label: "",
        })}
        QueryLovPanel={QueryLov}
        initialRow={{ uuidModule: "", label: "" }}
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

      <GenericQueryForm<MenuQueryFormValues>
        validationSchema={schema}
        defaultValues={{
          uuidModule: "",
          uuidModuleDescription: "",
          name: "",
        }}
        onFind={onFind}
        getFormApi={setFormApi}
        renderFields={({ register, formState }) => (
          <>
            <InputFieldLov
              test={true}
              onFind={() => handleOnFind()}
              title={t("modules.GS-CB-IT-001.fields.indexComboItem.title")}
              columns={BandPresentation.column_3}
              placeholder={t(
                "modules.GS-CB-IT-001.fields.indexComboItem.placeholder"
              )}
              directionLabel={Direction.horizontal}
              register={register("uuidModule")}
              registerDescription={register("uuidModuleDescription")}
              messageError={formState.errors.uuidModule?.message}
            />
            <InputField
              title={t("modules.GS-MN-001.fields.name.title")}
              columns={BandPresentation.column_3}
              placeholder={t("modules.GS-MN-001.fields.name.placeholder")}
              directionLabel={Direction.horizontal}
              register={register("name")}
              messageError={formState.errors.name?.message}
            />
          </>
        )}
      />
    </>
  );
};

export { QueryFormMenu };
