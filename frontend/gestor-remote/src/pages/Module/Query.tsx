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
import { Controller, useForm } from "react-hook-form";
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
import { IQueryProps } from "ux-ui/src/components/crud/Types";
import * as yup from "yup";
import { InputSelect, IPresentationInputSelect } from "../../components/Select";
import { Menus, MODULE } from "../../utils/Constants";
import { IRowDataModule } from "./Types";

/**
 * Tabla de Modulees del sistema.
 *
 * @param onEditRow Funcion para editar una fila.
 * @param onSeeRow Funcion para ver una fila.
 * @returns
 */
const QueryModule = ({ onEditRow, onSeeRow }: IQueryProps) => {
  const [t] = useTranslation("global_gestor");
  const [token, setToken] = useState<ITokenRoot>({} as ITokenRoot);
  const [parameterUrl, setParameterUrl] = useState<IParameter>(
    {} as IParameter
  );
  const [parametersQuery, setParametersQuery] = useState<IParametersQuery>({
    size: "10",
    indexModule: "",
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

      const parameter: IParameter = await getParameter(MODULE, "200");
      parameter.valueText01 = parameter.valueText01 + Menus.MODULE_ENDPOINT;
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
        name: "indexModule",
        title: t("modules.GS-MD-001.fields.indexModule.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        order: SortColumn.desc,
        orderNameColumn: "index_module",
      },
      {
        name: "name",
        title: t("modules.GS-MD-001.fields.name.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "20vw",
        onAction: {
          onAction: (row: IRowDataModule) => {
            if (onSeeRow) {
              onSeeRow(row);
            }
          },
        },
      },
      {
        name: "context",
        title: t("modules.GS-MD-001.fields.context.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "34vw",
      },
      {
        name: "userDate",
        title: t("modules.GS-MD-001.fields.userDate.title"),
        justification: JustificationText.start,
        format: TextFormat.dateSocialNetworkDinamic,
        width: "20vw",
        order: SortColumn.desc,
        orderNameColumn: "user_date",
      },

      {
        name: "status",
        title: t("modules.GS-MD-001.fields.status.title"),
        justification: JustificationText.start,
        format: TextFormat.none,
        width: "10vw",
        cellSelect: {
          items: [{
            value: "A",
            title: "Activo",
          },
          {
            value: "I",
            title: "Inactivo",
          },
          {
            value: "X",
            title: "Borrado",
          }],
        },
      },

      {
        name: "acciones",
        title: t("modules.GS-MD-001.fields.acciones.abrev"),
        justification: JustificationText.center,
        format: TextFormat.action,
        width: "6vw",
        component: (row: IRowDataModule) => (
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
    parametersQuery.indexModule = data.indexModule;
    parametersQuery.name = data.name;
    parametersQuery.status = data.status;
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
 * Formulario de consulta de Modulees del sistema.
 *
 * @param onFind Función para buscar Modulees
 * @returns
 */
const QueryForm = ({ onFind }: { onFind: (data: IParametersQuery) => void }) => {
  const [t] = useTranslation("global_gestor");

  const schema = yup.object({
    indexModule: yup
      .string()
      .max(128, t("validation.max", { max: 128 })),
    name: yup
      .string()
      .max(1024, t("validation.max", { max: 1024 })),
    status: yup
      .string(),
  });

  /**
   * Hook para el manejo de formularios.
   */
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      indexModule: "",
      name: "",
      status: "",
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

  const items: IPresentationInputSelect = {
    items: [
      {
        order: 0,
        justification: JustificationText.end,
        value: "A",
        title: "Activo",
        width: "100%",
      },
      {
        order: 1,
        justification: JustificationText.start,
        value: "I",
        title: "Inactivo",
        width: "100%",
      },

      {
        order: 10,
        justification: JustificationText.start,
        value: "X",
        color: "red",
        iconName: "TrashIcon",
        title: "Borrado",
        width: "100%",
      },
      {
        order: 9,
        separator: true,
      },

    ]
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InputField
        title={t("modules.GS-MD-001.fields.indexModule.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-MD-001.fields.indexModule.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("indexModule")}
        messageError={errors.indexModule?.message}
      />
      <InputField
        title={t("modules.GS-MD-001.fields.name.title")}
        columns={BandPresentation.column_3}
        placeholder={t("modules.GS-MD-001.fields.name.placeholder")}
        directionLabel={Direction.horizontal}
        register={register("name")}
        messageError={errors.name?.message}
      />
      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <InputSelect
            title={t("modules.GS-MD-001.fields.status.title")}
            placeholder={t("modules.GS-MD-001.fields.status.placeholder")}
            messageError={errors.status?.message}
            columns={BandPresentation.column_3}
            directionLabel={Direction.horizontal}
            items={items}
            {...field}
          />
        )}
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

export { QueryModule };
