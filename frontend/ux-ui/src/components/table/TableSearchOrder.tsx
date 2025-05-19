/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  Alerts,
  BandPresentation,
  Direction,
  MenuTableRefresh,
  SortColumn,
} from "../../ConstantsPresentation";
import { InputSubmit } from "../input/Input";
import { useToastContext } from "../toast/useToastContext";
import { MenuTable } from "./MenuTable";
import { IPresentationTable, TableConfigurable, TableSkeleton } from "./Table";
import { IParametersQuery } from "./TableSearch";

// Extiende la interfaz Window para permitir __tableSearchOrderIntervalId
declare global {
  interface Window {
    __tableSearchOrderIntervalId?: ReturnType<typeof setInterval>;
  }
}

/**
 * Componete para crear un field de busqueda.
 *
 * @author @omargo33
 * @since 2021-09-20
 *
 */

/**
 * Funcion para obtener los ordenamientos desde la presentacion de la tabla.
 *
 * @param presentationTable
 * @returns
 */
const getSorts = (presentationTable: IPresentationTable) => {
  const sortsFind: IParametersQuery = {} as IParametersQuery;

  for (const item of presentationTable.items) {
    if (item.order) {
      sortsFind[item.name] = item.order;
    }
  }

  return sortsFind;
};

/**
 * Componente para crear un field de busqueda.
 *
 * @param apiUrl
 * @param parametersToConsult
 * @param presentationTable
 * @param token
 * @param getToken
 * @returns
 */
const TableSearchOrder = ({
  apiUrl,
  parametersToConsult,
  presentationTable,
  token,
  getToken,
  menuTableRefresh = MenuTableRefresh.none,
  childrenMenu,
}: {
  apiUrl: string;
  parametersToConsult: IParametersQuery;
  presentationTable: IPresentationTable;
  token?: string;
  getToken?: (() => Promise<string>) | undefined;
  menuTableRefresh?: MenuTableRefresh;
  childrenMenu?: React.ReactNode;
}) => {
  const [t] = useTranslation("global_ux");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [parametersQuery, setParametersQuery] =
    useState<IParametersQuery>(parametersToConsult);
  const [presentation, setPresentation] =
    useState<IPresentationTable>(presentationTable);
  const [sorts, setSorts] = useState<IParametersQuery>(
    getSorts(presentationTable)
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { showToast } = useToastContext();

  /**
   * Validacion de los fields del formulario.
   */
  const getSchemaPage = (maxPage: number) =>
    yup.object({
      page: yup
        .string()
        .test("max-page", t("page.errorPage", { maxPage }), (value) => {
          return (
            parseInt(value || "0", 10) <= maxPage &&
            parseInt(value || "0", 10) > 0
          );
        }),
    });

  /**
   * Funcion para ejecutar la api.
   *
   */
  const runApi = async (parametersUrl: IParametersQuery) => {
    if (
      parametersUrl.page === undefined ||
      parametersUrl.page === null ||
      parametersUrl.page < 0
    ) {
      parametersUrl.page = 0;
    }

    if (totalPages === undefined || totalPages === null || totalPages <= 0) {
      setTotalPages(1);
    }

    if (parametersUrl.page >= totalPages) {
      const pageTemp = totalPages - 1 > 0 ? totalPages - 1 : 0;
      parametersUrl.page = pageTemp;
    }

    setTotalPages(0);
    setCurrentPage(0);
    setTotalItems(0);

    const sortsAnility = createSorts();

    const parametersQueryTem = Object.keys(parametersUrl)
      .sort()
      .reduce((sortedQuery, key) => {
        sortedQuery[key] = parametersUrl[key];
        return sortedQuery;
      }, {} as IParametersQuery);

    const parametersComplete = { ...parametersQueryTem, ...sortsAnility };

    setParametersQuery(parametersUrl);
    fetchData({
      url: apiUrl,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.URL_PARAMS,
      bodyParameter: parametersComplete,
      token: token,
      getToken: getToken,
    })
      .then((response) => {
        if (response.error) {
          const alertError =
            response.status >= 300 && response.status <= 499
              ? Alerts.warning
              : Alerts.error;
          showToast(
            response.error + " (" + response.status.toString() + ")",
            response.error,
            alertError
          );
          return;
        } else {
          const data = response.response.items;
          setData(data);
          setTotalPages(response.response.totalPages);
          setCurrentPage(response.response.currentPage);
          setTotalItems(response.response.totalItems);
        }
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  /**
   * Funcion para crear los parametros de ordenamiento en formato de URL y sort para la API.
   *
   * @returns
   */
  const createSorts = () => {
    let i = 1;
    /**
     * Funcion para crear un texto con un numero dado por la variable number.
     *
     * @param length
     * @returns
     */
    const lpad = (length: number) => {
      const text = "  ".repeat(length);
      return text;
    };

    /**
     * Funcion para crear los parametros de ordenamiento en formato de URL y sort para la API.
     *
     * Se toma en cuenta la configuracion de la presentacion de la tabla. Para campos ordenados que tienen un nombre de columna diferente al nombre del campo, se toma el nombre de la columna.
     *
     */
    const sortsTemp = Object.keys(sorts).reduce((object, key) => {
      if (sorts[key] !== SortColumn.neutral) {
        const item = presentationTable.items.find((item) => item.name === key);
        if (item?.orderNameColumn) {
          object[`sort` + lpad(i)] = item.orderNameColumn;
        } else {
          object[`sort` + lpad(i)] = key;
        }
        i++;
        object[`sort` + lpad(i)] = sorts[key];
        i++;
      }
      return object;
    }, {} as IParametersQuery);

    return sortsTemp;
  };

  /**
   * Ejecuta al iniciar de user effect.
   */
  useEffect(() => {
    const invokePresentation = () => {
      setLoading(true);
      const parametersPivot = parametersToConsult;
      parametersPivot.page = 0;
      setParametersQuery(parametersPivot);
      setPresentation(presentationTable);
      setSorts(getSorts(presentationTable));
      paginationPresentation(parametersPivot);
    };
    invokePresentation();
  }, [parametersToConsult]);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */

  const schemaPagina = getSchemaPage(totalPages);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */
  const {
    register: registerPage,
    handleSubmit: handleSubmitPagina,
    formState: { errors: errorsPagina },
  } = useForm({
    resolver: yupResolver(schemaPagina),
  });

  /**
   * Metodo para consultar el formulario de paginacion.
   *
   * @param data
   */
  const consultPage = async (data: any) => {
    parametersQuery.page = data.page - 1;
    paginationPresentation(parametersQuery);
  };

  /**
   * Metodo para el orderamiento, y; paginacion de botones inicio, atras, siguiente y fin.
   */
  const paginationPresentation = (parametersUrl: IParametersQuery) => {
    setLoading(true);
    setTimeout(async () => {
      await runApi(parametersUrl);
      setLoading(false);
    }, 333);
  };

  /**
   * Formulario para el paginado.
   *
   * @returns
   */
  const pageForm = () => {
    if (totalItems <= 0 || totalItems == undefined) {
      return <></>;
    }
    return (
      <>
        {totalPages > 1 && (
          <Flex direction="row" gap="1" align="baseline">
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = 0;
                paginationPresentation(parametersQuery);
              }}
            >
              <DoubleArrowLeftIcon width="14" height="14" />
            </IconButton>
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = currentPage - 1;
                paginationPresentation(parametersQuery);
              }}
            >
              <ChevronLeftIcon width="14" height="14" />
            </IconButton>
            <form onSubmit={handleSubmitPagina(consultPage)}>
              <InputSubmit
                placeholder={t("page.pagePlaceholder")}
                directionLabel={Direction.vertical}
                columna={BandPresentation.column_6}
                register={registerPage("page", { required: true })}
                messageError={errorsPagina.page?.message}
                size="2"
              />
            </form>
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = currentPage + 1;
                paginationPresentation(parametersQuery);
              }}
            >
              <ChevronRightIcon width="14" height="14" />
            </IconButton>
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = totalPages - 1;
                paginationPresentation(parametersQuery);
              }}
            >
              <DoubleArrowRightIcon width="14" height="14" />
            </IconButton>
          </Flex>
        )}
        <Text size="1">
          {t("page.informationPages", {
            pagina: currentPage + 1,
            totalPagina: totalPages,
            totalItems: totalItems,
          })}
        </Text>
      </>
    );
  };

  /**
   * Funcion para manejar el evento de ordenamiento y paginacion.
   *
   */
  const handlePaginationPresentation = () => {
    paginationPresentation(parametersQuery);
  };

  return (
    <Flex direction="row" gap="2">
      <Flex direction="column" gap="2" width={presentation.skeletonWidth}>
        {loading ? (
          <TableSkeleton column={presentationTable.items.length} />
        ) : (
          <>
            <TableConfigurable
              data={data}
              isBand={presentation.banding}
              presentationTable={presentation}
              presentationSorts={sorts}
              isHeader={presentation.headers}
              isLineNumber={presentation.numberLinea}
              onOrderChange={{
                onOrderChange: (name: string, direccion: SortColumn) => {
                  sorts[name] = direccion;
                  setSorts(sorts);
                  handlePaginationPresentation();
                },
              }}
            />
            {pageForm()}
          </>
        )}
      </Flex>
      <MenuTable
        loading={loading}
        handlePaginationPresentation={handlePaginationPresentation}
        menuTableRefresh={menuTableRefresh}>
        {childrenMenu}
      </MenuTable>
    </Flex>
  );
};

export { TableSearchOrder };
