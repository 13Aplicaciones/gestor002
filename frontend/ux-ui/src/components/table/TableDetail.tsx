/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Flex } from "@radix-ui/themes";
import { fetchData, MethodREST, TypeBody } from "api-fetch";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alerts, SortColumn } from "../../ConstantsPresentation";
import { useToastContext } from "../toast/useToastContext";
import { IPresentationTable, TableConfigurable, TableSkeleton } from "./Table";

/**
 * Componete para crear un field de busqueda.
 *
 * @author @omargo33
 * @since 2021-09-20
 *
 */

/**
 * Interfaz para los parametros de la API.
 */
interface IParametersQuery {
  [key: string]: any;
}

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
const TableDetail = ({
  apiUrl,
  presentationTable,
  token,
  getToken,
}: {
  apiUrl: string;
  presentationTable: IPresentationTable;
  children?: ReactNode;
  token?: string;
  getToken?: (() => Promise<string>) | undefined;
}) => {
  const [t] = useTranslation("global_ux");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [presentation, setPresentation] =
    useState<IPresentationTable>(presentationTable);
  const { showToast } = useToastContext();

  /**
   * Funcion para ejecutar la api.
   *
   */
  const runApi = async () => {
    fetchData({
      url: apiUrl,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.URL_PARAMS,
      token: token,
      getToken: getToken,
    })
      .then((response) => {
        if (response.error) {
          showToast(
            response.error + " (" + response.status.toString() + ")",
            t("httpStatusResolve." + response.status.toString()),
            Alerts.warning
          );
          return;
        } else {
          const data = response.response.items;
          setData(data);
        }
      })
      .catch((error) => {
        console.error("Error: " + error);
      });
  };

  /**
   * Ejecuta al iniciar de user effect.
   */
  useEffect(() => {
    setLoading(true);

    setPresentation(presentationTable);

    const shortsFind: string[] = [];
    presentation.items
      .filter((item: { order?: SortColumn }) => item.order !== undefined)
      .forEach((item: { name: string; order?: SortColumn }) => {
        if (item.order !== SortColumn.neutral) {
          shortsFind.push("sort=" + item.name + "&sort=" + item.order);
        }
      });

    paginationPresentation();
  }, [apiUrl, presentationTable]);

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

  return (
    <Flex direction="column" gap="2" width={presentation.skeletonWidth}>
      {loading ? (
        <TableSkeleton column={presentation.items.length} />
      ) : (
        <>
          <TableConfigurable
            data={data}
            isBand={presentation.banding}
            presentationTable={presentation}
            isHeader={presentation.headers}
            isLineNumber={presentation.numberLinea}
          />
        </>
      )}

      <Flex gap="2">
        <Button variant="outline">Acción 1</Button>
        <Button variant="outline">Acción 2</Button>
      </Flex>
    </Flex>
  );
};

export { TableDetail };
export type { IParametersQuery };
