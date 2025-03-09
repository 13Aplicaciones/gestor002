/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alerts, BandPresentation, Direction } from "../../ConstantsPresentation";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { fetchData } from "api-fetch";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { InputSearchDynamic, InputSubmit } from "../input/Input";
import { MethodREST, TypeBody } from "api-fetch";
import { TableConfigurable, TableSkeleton } from "./Table";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToastContext } from "../toast/useToastContext";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * Componete para crear un field de busqueda.
 * 
 * @author @omargo33
 * @since 2021-09-20
 * 
*/

/*
* Componente para crear un field de busqueda.
* 
* @param apiUrl URL de la API.
* @param nameIndex Nombre del indice.
* @param parametersApi Parametros de la API.
* @param presentationItem Presentacion de los items.
* @param children Hijos del componente.
* 
* @returns 
*/
const CreateSearchField = (
  { apiUrl, nameIndex, parametersApi, presentationItem, children, token, getToken  }:
  {
    apiUrl: string,
    nameIndex: string,
    parametersApi: any,
    presentationItem: any,
    children?: any,
    token?: string,
    getToken?: (() =>  Promise<string>) | undefined;
  }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation("global_ux");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { showToast } = useToastContext();

  /** 
    * Validacion de los fields del formulario.
    */
  const getSchemaPage = (maxPage: number) => yup.object(
    {
      page: yup
        .string()
        .test('max-page', t('page.errorPage', { maxPage }), value => {
          return parseInt(value || '0', 10) <= maxPage && parseInt(value || '0', 10) > 0;
        })
    }
  );

  /** 
    * Validacion de los fields del formulario.
    */
  const schemaBusqueda = yup.object(
    {
      search: yup.string()
    }
  );

  /**
   * Funcion para ejecutar la api.
   *    
   */
  const runApi = async () => {

    if (parametersApi[nameIndex] === undefined || parametersApi[nameIndex] === null) {
      parametersApi[nameIndex] = '';
    }

    if (parametersApi.page === undefined || parametersApi.page === null || parametersApi.page < 0) {
      parametersApi.page = 0;
    }

    if (totalPages === undefined || totalPages === null || totalPages <= 0) {
      setTotalPages(1);
    }

    if (parametersApi.page >= totalPages) {
      const pageTemp = (totalPages - 1) > 0 ? (totalPages - 1) : 0;
      parametersApi.page = pageTemp;
    }

    setTotalPages(0);
    setCurrentPage(0);
    setTotalItems(0);

    fetchData({
      url: apiUrl,
      methodRest: MethodREST.GET,
      typeBody: TypeBody.URL_PARAMS,
      bodyParameter: parametersApi,
      token: token,
      getToken: getToken,
    })
      .then(response => {
        if (response.error) {
          showToast(
            response.error + " (" + response.status.toString() + ")",
            t('httpStatusResolve.' + response.status.toString()),
            Alerts.warning
          );
          return;
        } else {
          const items = response.response.items;
          setItems(items);
          setTotalPages(response.response.totalPages);
          setCurrentPage(response.response.currentPage);
          setTotalItems(response.response.totalItems);
        }
      }).catch(error => {
        showToast(
          "Error",
          error,
          Alerts.error
        );
      });
  }


  /**
   * Ejecuta al iniciar de user effect.
   */
  useEffect(() => {
    setLoading(true);

    const itemsPivot = presentationItem.items.map((item: any) => {
      if (item.order !== undefined) {
        return {
          ...item,
          actionOrder: (order: any) => {
            presentationItem.items[order.index].order = order.order;
            const spaces = ' '.repeat(order.index);

            if (order.order === 'none') {
              delete parametersApi[spaces + 'sort'];
              delete parametersApi[spaces + ' sort'];
            } else {
              parametersApi[spaces + 'sort'] = order.name;
              parametersApi[spaces + ' sort'] = order.order;
            }

            paginationPresentation();
          }
        };
      }
      return item;
    });

    presentationItem.items = itemsPivot;
    parametersApi[nameIndex] = '';
    parametersApi.page = 0;
    paginationPresentation();
  }, []);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */
  const { register: registerSearch, handleSubmit: handleSubmitBusqueda, formState: { errors: errorsBusqueda } } = useForm({
    resolver: yupResolver(schemaBusqueda)
  });

  const schemaPagina = getSchemaPage(totalPages);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */
  const { register: registerPage, handleSubmit: handleSubmitPagina, reset: resetPagina, formState: { errors: errorsPagina } } = useForm({
    resolver: yupResolver(schemaPagina)
  });

  /**
   * Metodo para consultar el formulario de busqueda.
   * 
   * Y limpiar la consulta de paginacion.
   * 
   * @param data 
   */
  const consultSearch = async (data: any) => {
    resetPagina();
    parametersApi[nameIndex] = data.search;
    parametersApi.page = 0;
    paginationPresentation();
  }

  /**
   * Metodo para consultar el formulario de paginacion.
   * 
   * @param data 
   */
  const consultPage = async (data: any) => {
    parametersApi.page = ((data.page - 1));
    paginationPresentation();
  }

  /**
   * Metodo para el orderamiento, y; paginacion de botones inicio, atras, siguiente y fin.
   */
  const paginationPresentation = () => {
    setLoading(true);
    setTimeout(async () => {
      await runApi();
      setLoading(false);
    }, 333);
  }

  /**
   * Formulario para la busqueda.
   * 
   * @returns 
   */
  const searchForm = () => {
    return (
      <Flex direction="row" gap="1" align="baseline">
        <form onSubmit={handleSubmitBusqueda(consultSearch)}>
          <InputSearchDynamic
            placeholder="Buscar"
            columna={BandPresentation.column_6}
            register={registerSearch("search", { required: true })}
            messageError={errorsBusqueda.search?.message}
          />
        </form>
        {children}
      </Flex>
    );
  }

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
        {
          (totalPages > 1 &&
            <Flex direction="row" gap="1" align="baseline" >
              <IconButton variant="outline" onClick={async () => {
                parametersApi.page = 0;
                paginationPresentation();
              }
              }>
                <DoubleArrowLeftIcon width="14" height="14" />
              </IconButton>
              <IconButton variant="outline" onClick={async () => {
                parametersApi.page = (currentPage - 1);
                paginationPresentation();
              }
              }>

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
              <IconButton variant="outline" onClick={async () => {
                parametersApi.page = (currentPage + 1);
                paginationPresentation();
              }
              }>

                <ChevronRightIcon width="14" height="14" />
              </IconButton>
              <IconButton variant="outline" onClick={async () => {
                parametersApi.page = (totalPages - 1);
                paginationPresentation();
              }
              }>
                <DoubleArrowRightIcon width="14" height="14" />
              </IconButton>
            </Flex>)
        }
        <Text size="1">{t("page.informationPages", { pagina: (currentPage + 1), totalPagina: totalPages, totalItems: totalItems })}</Text>
      </>
    );
  }

  return (
    <Flex direction="column" gap="2" width={presentationItem.skeleton.width}>
      {searchForm()}
      {
        loading ?
          <TableSkeleton column={parametersApi.size} /> :
          <>
            <TableConfigurable
              data={items}
              isBand={presentationItem.banding}
              presentation={presentationItem.items}
              isHeader={presentationItem.headers}
              isLineNumber={presentationItem.numberLinea}
            />
            {pageForm()}
          </>
      }
    </Flex>
  );
}

export { CreateSearchField };
