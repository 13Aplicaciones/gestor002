import { yupResolver } from "@hookform/resolvers/yup";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
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
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  BandPresentation,
  CreateSearchFieldOrder,
  Direction, FooterForm, InputField,
  IParametersQuery,
  IPresentationTable,
  JustificationText, SortColumn,
  TextFormat,
} from "ux-ui";
import * as yup from "yup";
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import { Modules } from "../../utils/Constants";
import { IRowDataError } from "./Types";

/**
 * Tabla de errores del sistema.
 *
 * @param onEditRow Funcion para editar una fila.
 * @param onSeeRow Funcion para ver una fila.
 * @returns
 */
const QueryError = ({ onEditRow, onSeeRow }: IQueryProps) => {
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({
    size: "10",
    indexError: "",
    message: "",
  });

  /**
   * Funcion para inicializar el token
   *
   */
  useEffect(() => {
    const initializeStructure = async () => {
      const tokenTemp: ITokenRoot = await getToken();
      setToken(tokenTemp);

      const parameter: IParameter = await getParameter(Modules.GS_001_00, "200");
      setParameterUrl(parameter);
    };

    initializeStructure();
  }, []);

  /**
   * Presentación de los items de la tabla.
   */
  const presentationItems: IPresentationTable = {
    banding: true,
    headers: true,
    numberLinea: false,
    skeletonWidth: "90vw",
    items: [
      {
        name: "indexError",
        title: t("modules.GS-ER-001.fields.indexError.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_error",
      },
      {
        name: "message",
        title: t("modules.GS-ER-001.fields.message.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        onAction: {
          onAction: (row: IRowDataError) => {
            if (onSeeRow) {
              onSeeRow(row);
            }
          },
        },
      },
      {
        name: "description",
        title: t("modules.GS-ER-001.fields.description.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "34vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-ER-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },
      {
        name: "acciones",
        title: t("modules.GS-ER-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
        component: (row: IRowDataError) => (
          <Button
            size="1"
            variant="ghost"
            onClick={() => {
              if (onEditRow) {
                onEditRow(row);
              }
            }}
          >
            <DotsVerticalIcon width="16" height="16" />
          </Button>
        ),
      },
    ],
  };

  /**
   * Funcion para manejar la busqueda de los datos y pasar los datos al componente de busqueda.
   * 
   * @param data 
   */
  const handleFormFind = (data: IParametersQuery) => {
    parametersQuery.indexError = data.indexError;
    parametersQuery.message = data.message;
    setParametersQuery({ ...parametersQuery });
  };

  return (
    <Flex direction="column" gap="3">
      {token?.access_token && parameterUrl?.valueText01 && (
        <>
          <QueryForm onFind={handleFormFind} />
          <CreateSearchFieldOrder
            apiUrl={parameterUrl?.valueText01 + "/paginated"}
            parametersToConsult={parametersQuery}
            presentationTable={presentationItems}
            token={token.access_token}
            getToken={async () => {
              return await refreshToken();
            }}
          />
        </>
      )}
    </Flex>
  );
};

/**
 * Formulario de consulta de errores del sistema.
 *
 * @param onFind Función para buscar errores
 * @returns
 */
const QueryForm = ({ onFind }: { onFind: (data: IParametersQuery) => void }) => {
  const [t] = useTranslation("global_gestor");
  
  const schema = yup.object({
    indexError: yup
      .string()
      .max(128, t("validation.max", { max: 128 })),
    message: yup
      .string()
      .max(1024, t("validation.max", { max: 1024 })),
  });

  /**
   * Hook para el manejo de formularios.
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexError: "",
      message: ""
    },
  });
  
  /**
   * Función para enviar el formulario.
   *
   * @param data
   */
  const submitForm = (data: IParametersQuery) => {
    if (onFind) {
      onFind(data);
    }
  };

  /**
   * Función para limpiar el formulario y los datos de la consulta.
   * 
   */
  const resetForm = () => {
    if (onFind) {
      onFind({});
    }
    reset();
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField
        title={t("modules.GS-ER-001.fields.indexError.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-ER-001.fields.indexError.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("indexError")}
        messageError={errors.indexError?.message}
      />
      <InputField
        title={t("modules.GS-ER-001.fields.message.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-ER-001.fields.message.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("message")}
        messageError={errors.message?.message}
      />
      <FooterForm
        directionLabel={Direction.horizontal}
        columns={BandPresentation.column_2}
      >
        <Button type="submit">{t("actions.search")}</Button>
        <Button type="button"
        variant="surface"
        onClick={() => resetForm()}>
          {t("actions.clean")}
        </Button>
      </FooterForm>
    </form>
  );
};

export { QueryError };
