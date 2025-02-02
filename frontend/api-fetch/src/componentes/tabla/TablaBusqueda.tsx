/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alertas, BandaPresentacion, Direccion } from "../../ConstantesPresentacion";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { fetchData } from "../../api/Api";
import { Flex, IconButton, Text } from "@radix-ui/themes";
import { InputBusquedaDinamica, InputSubmit } from "../input/Input";
import { MetodosREST, TipoBody } from "../../ConstantesAPI";
import { requestToken } from "../../api/Token";
import { TableConfigurable, TableSkeleton } from "./Tabla";
import { toast } from "../toast/Toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * Componete para crear un campo de busqueda.
 * 
 * @author @omargo33
 * @since 2021-09-20
 * 
*/

/*
* Componente para crear un campo de busqueda.
* 
* @param apiUrl URL de la API.
* @param nombreIndice Nombre del indice.
* @param parametrosApi Parametros de la API.
* @param presentacionItem Presentacion de los items.
* @param children Hijos del componente.
* 
* @returns 
*/
const CrearCampoBusqueda = ({ apiUrl, nombreIndice, parametrosApi, presentacionItem, children }:
  {
    apiUrl: string,
    nombreIndice: string,
    parametrosApi: any,
    presentacionItem: any,
    children?: any
  }) => {

  const [currentPage, setCurrentPage] = useState(0);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [t] = useTranslation("global");
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  /** 
    * Validacion de los campos del formulario.
    */
  const getSchemaPagina = (maxPage: number) => yup.object(
    {
      page: yup
        .string()
        .test('max-page', t('pagina.errorPagina', { maxPage }), value => {
          return parseInt(value || '0', 10) <= maxPage && parseInt(value || '0', 10) > 0;
        })
    }
  );

  /** 
    * Validacion de los campos del formulario.
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
  const ejecutarApi = async () => {

    if (parametrosApi[nombreIndice] === undefined || parametrosApi[nombreIndice] === null) {
      parametrosApi[nombreIndice] = '';
    }

    if (parametrosApi.page === undefined || parametrosApi.page === null || parametrosApi.page < 0) {
      parametrosApi.page = 0;
    }

    if (totalPages === undefined || totalPages === null || totalPages <= 0) {
      setTotalPages(1);
    }

    if (parametrosApi.page >= totalPages) {
      const pageTemp = (totalPages - 1) > 0 ? (totalPages - 1) : 0;
      parametrosApi.page = pageTemp;
    }

    setTotalPages(0);
    setCurrentPage(0);
    setTotalItems(0);

    let token = "";

    //TODO: Revisar para tomar el token de la sesion o de otro metodo.
    await requestToken().then((credencial) => {
      if (credencial?.access_token) {
        token = credencial.access_token;
        fetchData({
          url: apiUrl,
          methodRest: MetodosREST.GET,
          tipoBody: TipoBody.URL_PARAMS,
          bodyParametro: parametrosApi,
          token: token
        })
          .then(response => {
            if (response.error) {
              toast({
                title: response.status.toString(),
                description: response.error,
                alerta: Alertas.warning
              });
              return;
            } else {
              const respuesta = response.response.items;
              setItems(respuesta);
              setTotalPages(response.response.totalPages);
              setCurrentPage(response.response.currentPage);
              setTotalItems(response.response.totalItems);
            }
          }).catch(error => {
            toast({
              title: "Error",
              description: error,
              alerta: Alertas.error
            });
          });
      }
    });
  }

  /**
   * Ejecuta al iniciar de user effect.
   */
  useEffect(() => {
    setLoading(true);

    const itemsPivot = presentacionItem.items.map((item: any) => {
      if (item.orden !== undefined) {
        return {
          ...item,
          accionOrden: (order: any) => {
            presentacionItem.items[order.index].orden = order.orden;
            const espacios = ' '.repeat(order.index);

            if (order.orden === 'none') {
              delete parametrosApi[espacios + 'sort'];
              delete parametrosApi[espacios + ' sort'];
            } else {
              parametrosApi[espacios + 'sort'] = order.nombre;
              parametrosApi[espacios + ' sort'] = order.orden;
            }

            paginacionPresentacion();
          }
        };
      }
      return item;
    });

    presentacionItem.items = itemsPivot;
    parametrosApi[nombreIndice] = '';
    parametrosApi.page = 0;
    paginacionPresentacion();
  }, []);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */
  const { register: registerBusqueda, handleSubmit: handleSubmitBusqueda, formState: { errors: errorsBusqueda } } = useForm({
    resolver: yupResolver(schemaBusqueda)
  });

  const schemaPagina = getSchemaPagina(totalPages);

  /**
   * Hook para el formulario y usa register, handleSubmit y reset.
   */
  const { register: registerPagina, handleSubmit: handleSubmitPagina, reset: resetPagina, formState: { errors: errorsPagina } } = useForm({
    resolver: yupResolver(schemaPagina)
  });

  /**
   * Metodo para consultar el formulario de busqueda.
   * 
   * Y limpiar la consulta de paginacion.
   * 
   * @param data 
   */
  const consultarBusqueda = async (data: any) => {
    resetPagina();
    parametrosApi[nombreIndice] = data.search;
    parametrosApi.page = 0;
    paginacionPresentacion();
  }

  /**
   * Metodo para consultar el formulario de paginacion.
   * 
   * @param data 
   */
  const consultarPaginar = async (data: any) => {
    parametrosApi.page = ((data.page - 1));
    paginacionPresentacion();
  }

  /**
   * Metodo para el ordenamiento, y; paginacion de botones inicio, atras, siguiente y fin.
   */
  const paginacionPresentacion = () => {
    setLoading(true);
    setTimeout(async () => {
      await ejecutarApi();
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
        <form onSubmit={handleSubmitBusqueda(consultarBusqueda)}>
          <InputBusquedaDinamica
            placeholder="Buscar"
            columna={BandaPresentacion.columna_6}
            register={registerBusqueda("search", { required: true })}
            mensajeError={errorsBusqueda.search?.message}
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
  const paginadoForm = () => {

    if (totalItems <= 0 || totalItems == undefined) {
      return <></>;
    }
    return (
      <>
        {
          (totalPages > 1 &&
            <Flex direction="row" gap="1" align="baseline" >
              <IconButton variant="outline" onClick={async () => {
                parametrosApi.page = 0;
                paginacionPresentacion();
              }
              }>
                <DoubleArrowLeftIcon width="14" height="14" />
              </IconButton>
              <IconButton variant="outline" onClick={async () => {
                parametrosApi.page = (currentPage - 1);
                paginacionPresentacion();
              }
              }>

                <ChevronLeftIcon width="14" height="14" />
              </IconButton>
              <form onSubmit={handleSubmitPagina(consultarPaginar)}>
                <InputSubmit
                  placeholder={t("pagina.paginaPlaceholder")}
                  direccionLabel={Direccion.vertical}
                  columna={BandaPresentacion.columna_6}
                  register={registerPagina("page", { required: true })}
                  mensajeError={errorsPagina.page?.message}
                  size="2"
                />
              </form>
              <IconButton variant="outline" onClick={async () => {
                parametrosApi.page = (currentPage + 1);
                paginacionPresentacion();
              }
              }>

                <ChevronRightIcon width="14" height="14" />
              </IconButton>
              <IconButton variant="outline" onClick={async () => {
                parametrosApi.page = (totalPages - 1);
                paginacionPresentacion();
              }
              }>
                <DoubleArrowRightIcon width="14" height="14" />
              </IconButton>
            </Flex>)
        }
        <Text size="1">{t("pagina.informacionPaginas", { pagina: (currentPage + 1), totalPagina: totalPages, totalItems: totalItems })}</Text>
      </>
    );
  }

  return (
    <Flex direction="column" gap="2" width={presentacionItem.skeleton.width}>
      {searchForm()}
      {
        loading ?
          <TableSkeleton column={parametrosApi.size} /> :
          <>
            <TableConfigurable
              data={items}
              isBanda={presentacionItem.banding}
              presentacion={presentacionItem.items}
              isEncabezado={presentacionItem.encabezados}
              isNumeroLinea={presentacionItem.numeroLinea}
            />
            {paginadoForm()}
          </>
      }
    </Flex>
  );
}

export { CrearCampoBusqueda };
