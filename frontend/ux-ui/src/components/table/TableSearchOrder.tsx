/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BandPresentation,
  Direction,
  SortColumn,
} from "../../ConstantsPresentation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { fetchData } from "api-fetch";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { InputSubmit } from "../input/Input";
import { MethodREST, TypeBody } from "api-fetch";
import { useEffect, useState } from "react";
import { IPresentationTable, TableConfigurable, TableSkeleton } from "./Table";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IParametersQuery } from "./TableSearch";

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

/*
 * Componente para crear un field de busqueda.
 *
 * @param apiUrl URL de la API.
 * @param nameIndex Nombre del indice.
 * @param parameters Parameters de la API.
 * @param presentationItem Presentacion de los items.
 * @param children Hijos del componente.
 *
 * @returns
 */
const CreateSearchFieldOrder = ({
  apiUrl,
  parametersToConsult,
  presentationTable,
  token,
  getToken,
}: {
  apiUrl: string;
  parametersToConsult: IParametersQuery;
  presentationTable: IPresentationTable;
  token?: string;
  getToken?: (() => Promise<string>) | undefined;
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
  const runApi = async () => {
    if (
      parametersQuery.page === undefined ||
      parametersQuery.page === null ||
      parametersQuery.page < 0
    ) {
      parametersQuery.page = 0;
    }

    if (totalPages === undefined || totalPages === null || totalPages <= 0) {
      setTotalPages(1);
    }

    if (parametersQuery.page >= totalPages) {
      const pageTemp = totalPages - 1 > 0 ? totalPages - 1 : 0;
      parametersQuery.page = pageTemp;
    }

    setTotalPages(0);
    setCurrentPage(0);
    setTotalItems(0);

    const sortsAnility = createSorts();

    const parametersQueryTem = Object.keys(parametersQuery)
      .sort()
      .reduce((sortedQuery, key) => {
        sortedQuery[key] = parametersQuery[key];
        return sortedQuery;
      }, {} as IParametersQuery);

    const parametersComplete = { ...parametersQueryTem, ...sortsAnility };

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
          //TODO: Implementar alertas
          /*showToast(
            response.error + " (" + response.status.toString() + ")",
            t("httpStatusResolve." + response.status.toString()),
            Alerts.warning
          );*/
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
    setLoading(true);

    parametersQuery.page = 0;
    setParametersQuery(parametersToConsult);
    setPresentation(presentationTable);
    setSorts(getSorts(presentationTable));
    paginationPresentation();
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
    paginationPresentation();
  };

  /**
   * Metodo para el orderamiento, y; paginacion de botones inicio, atras, siguiente y fin.
   */
  const paginationPresentation = () => {
    setLoading(true);
    setTimeout(async () => {
      await runApi();
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
                paginationPresentation();
              }}
            >
              <DoubleArrowLeftIcon width="14" height="14" />
            </IconButton>
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = currentPage - 1;
                paginationPresentation();
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
                paginationPresentation();
              }}
            >
              <ChevronRightIcon width="14" height="14" />
            </IconButton>
            <IconButton
              variant="outline"
              onClick={async () => {
                parametersQuery.page = totalPages - 1;
                paginationPresentation();
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

  return (
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
                paginationPresentation();
              },
            }}
          />
          {pageForm()}
        </>
      )}
    </Flex>
  );
};

export { CreateSearchFieldOrder };
